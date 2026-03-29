import { useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"
const MAX_ATTACHMENTS = 3
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error("Unable to read file."))
    reader.readAsDataURL(file)
  })

function FeedbackForm() {
  const [message, setMessage] = useState("")
  const [category, setCategory] = useState("General")
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [submitterName, setSubmitterName] = useState("")
  const [rating, setRating] = useState(5)
  const [attachments, setAttachments] = useState([])
  const [voiceNote, setVoiceNote] = useState(null)
  const [status, setStatus] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingError, setRecordingError] = useState("")

  const mediaRecorderRef = useRef(null)
  const recordingChunksRef = useRef([])
  const recordingStartedAtRef = useRef(null)

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const attachmentPreviews = useMemo(
    () => attachments.map((item, index) => ({ ...item, id: `${item.name}-${index}` })),
    [attachments]
  )

  const resetForm = () => {
    setMessage("")
    setCategory("General")
    setIsAnonymous(true)
    setSubmitterName("")
    setRating(5)
    setAttachments([])
    setVoiceNote(null)
    setRecordingError("")
  }

  const handleAttachmentChange = async (event) => {
    const selectedFiles = Array.from(event.target.files || [])
    if (selectedFiles.length === 0) {
      return
    }

    const availableSlots = MAX_ATTACHMENTS - attachments.length
    if (availableSlots <= 0) {
      setStatus(`You can upload up to ${MAX_ATTACHMENTS} images only.`)
      event.target.value = ""
      return
    }

    const filesToProcess = selectedFiles.slice(0, availableSlots)

    try {
      const newFiles = []
      for (const file of filesToProcess) {
        if (!file.type.startsWith("image/")) {
          setStatus("Only image or screenshot files are allowed.")
          continue
        }

        if (file.size > MAX_IMAGE_SIZE_BYTES) {
          setStatus("Each image must be 2MB or smaller.")
          continue
        }

        const dataUrl = await fileToDataUrl(file)
        newFiles.push({
          name: file.name,
          mimeType: file.type,
          size: file.size,
          dataUrl
        })
      }

      if (newFiles.length > 0) {
        setAttachments((current) => [...current, ...newFiles])
        setStatus("")
      }
    } catch (error) {
      setStatus("Unable to process the selected image.")
    } finally {
      event.target.value = ""
    }
  }

  const removeAttachment = (indexToRemove) => {
    setAttachments((current) => current.filter((_, index) => index !== indexToRemove))
  }

  const startRecording = async () => {
    setRecordingError("")
    setStatus("")

    if (!navigator.mediaDevices?.getUserMedia || typeof window.MediaRecorder === "undefined") {
      setRecordingError("Voice recording is not supported in this browser.")
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      recordingChunksRef.current = []
      recordingStartedAtRef.current = Date.now()

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordingChunksRef.current.push(event.data)
        }
      }

      recorder.onstop = async () => {
        const mimeType = recorder.mimeType || "audio/webm"
        const audioBlob = new Blob(recordingChunksRef.current, { type: mimeType })
        const durationSeconds = recordingStartedAtRef.current
          ? Math.max(1, Math.round((Date.now() - recordingStartedAtRef.current) / 1000))
          : 0

        if (audioBlob.size > 5 * 1024 * 1024) {
          setRecordingError("Voice note must be 5MB or smaller.")
        } else {
          const dataUrl = await fileToDataUrl(audioBlob)
          setVoiceNote({ mimeType, durationSeconds, dataUrl })
        }

        stream.getTracks().forEach((track) => track.stop())
        setIsRecording(false)
      }

      mediaRecorderRef.current = recorder
      recorder.start()
      setVoiceNote(null)
      setIsRecording(true)
    } catch (error) {
      setRecordingError("Microphone access was blocked or unavailable.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!message.trim()) {
      setStatus("Please enter feedback.")
      return
    }

    if (!isAnonymous && !submitterName.trim()) {
      setStatus("Please enter your name or switch back to anonymous.")
      return
    }

    setIsSubmitting(true)
    setStatus("")

    try {
      const response = await axios.post(`${API_BASE_URL}/api/feedback`, {
        message,
        category,
        isAnonymous,
        submitterName,
        rating,
        attachments,
        voiceNote
      })

      setStatus(response.data.message)
      resetForm()
    } catch (error) {
      setStatus(error.response?.data?.error || "Error submitting feedback.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="feedback-form">
      <h3>Share Your Feedback</h3>

      <form onSubmit={handleSubmit} className="feedback-form-grid">
        <label className="feedback-field">
          <span>Your feedback</span>
          <textarea
            placeholder="Write your feedback here..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>

        <div className="feedback-row">
          <label className="feedback-field">
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option>General</option>
              <option>Leadership</option>
              <option>Events</option>
              <option>Communication</option>
            </select>
          </label>

          <label className="feedback-field">
            <span>Rating</span>
            <select value={rating} onChange={(event) => setRating(Number(event.target.value))}>
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Very Poor</option>
            </select>
          </label>
        </div>

        <label className="feedback-toggle">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(event) => setIsAnonymous(event.target.checked)}
          />
          <span>Submit anonymously</span>
        </label>

        {!isAnonymous && (
          <label className="feedback-field">
            <span>Your name</span>
            <input
              type="text"
              placeholder="Enter your name"
              value={submitterName}
              onChange={(event) => setSubmitterName(event.target.value)}
            />
          </label>
        )}

        <label className="feedback-field">
          <span>Upload images or screenshots</span>
          <input type="file" accept="image/*" multiple onChange={handleAttachmentChange} />
          <small>Up to 3 files, 2MB each.</small>
        </label>

        {attachmentPreviews.length > 0 && (
          <div className="attachment-preview-grid">
            {attachmentPreviews.map((file, index) => (
              <div key={file.id} className="attachment-card">
                <img src={file.dataUrl} alt={file.name} />
                <div className="attachment-card-footer">
                  <small>{file.name}</small>
                  <button type="button" className="secondary-button" onClick={() => removeAttachment(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="voice-recorder-panel">
          <div>
            <span className="panel-title">Voice feedback</span>
            <p>Record a short voice note to add context to your message.</p>
          </div>

          <div className="voice-recorder-actions">
            {!isRecording ? (
              <button type="button" className="secondary-button" onClick={startRecording}>
                Start recording
              </button>
            ) : (
              <button type="button" className="danger-button" onClick={stopRecording}>
                Stop recording
              </button>
            )}

            {voiceNote && (
              <button type="button" className="secondary-button" onClick={() => setVoiceNote(null)}>
                Remove audio
              </button>
            )}
          </div>

          {isRecording && <p className="recording-indicator">Recording in progress...</p>}
          {recordingError && <p className="form-status error">{recordingError}</p>}

          {voiceNote && (
            <div className="voice-preview">
              <audio controls src={voiceNote.dataUrl} />
              <small>Length: {voiceNote.durationSeconds}s</small>
            </div>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className="primary-button">
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>

      {status && <p className={`form-status ${status.toLowerCase().includes("error") ? "error" : "success"}`}>{status}</p>}
    </div>
  )
}

export default FeedbackForm
