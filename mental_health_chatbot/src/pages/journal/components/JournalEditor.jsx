import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import speechToTextService from "../../../services/speechToTextService"; // ✅ import your Web Speech API service

const JournalEditor = ({
  content,
  onContentChange,
  onSave,
  autoSaveStatus
}) => {
  const [editorContent, setEditorContent] = useState(content);
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptBuffer, setTranscriptBuffer] = useState("");

  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  useEffect(() => {
    // ✅ Setup callbacks for SpeechToTextService
    speechToTextService.setCallbacks({
      onStart: () => {
        console.log("🎙️ Recording started");
        setIsRecording(true);
        setTranscriptBuffer("");
      },
      onResult: (data) => {
        console.log("📝 Speech result:", data);
        if (data.isFinal) {
          // Add the final transcript to the editor
          const appended = (editorContent ? editorContent + " " : "") + data.finalTranscript;
          setEditorContent(appended);
          onContentChange(appended);
          setTranscriptBuffer("");
        } else {
          // Show interim transcript
          setTranscriptBuffer(data.interimTranscript);
        }
      },
      onError: (err) => {
        console.error("Speech recognition error:", err);
        setIsRecording(false);
      },
      onEnd: () => {
        console.log("🛑 Recording ended");
        setIsRecording(false);
      }
    });
  }, [editorContent, onContentChange]);

  const handleChange = (e) => {
    setEditorContent(e.target.value);
    onContentChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newText = editorContent.substring(0, start) + "    " + editorContent.substring(end);
      setEditorContent(newText);
      onContentChange(newText);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const applyFormatting = (format) => {
    const textarea = document.getElementById("journal-textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editorContent.substring(start, end);
    let formattedText = "";
    let cursorPosition = 0;

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        cursorPosition = start + 2;
        break;
      case "italic":
        formattedText = `_${selectedText}_`;
        cursorPosition = start + 1;
        break;
      case "list":
        formattedText = `\n- ${selectedText}`;
        cursorPosition = start + 3;
        break;
      default:
        return;
    }

    const newText = editorContent.substring(0, start) + formattedText + editorContent.substring(end);
    setEditorContent(newText);
    onContentChange(newText);

    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.selectionStart = textarea.selectionEnd = end + formattedText.length - selectedText.length;
      } else {
        textarea.selectionStart = textarea.selectionEnd = cursorPosition;
      }
    }, 0);
  };

  // ✅ Start speech recognition
  const startRecording = () => {
    console.log("🎤 Starting speech recognition...");
    speechToTextService.startRecording();
  };

  // ✅ Stop speech recognition
  const stopRecording = () => {
    console.log("🛑 Stopping speech recognition...");
    speechToTextService.stopRecording();

    // Add remaining transcript buffer if any
    if (transcriptBuffer) {
      const appended = (editorContent ? editorContent + " " : "") + transcriptBuffer;
      setEditorContent(appended);
      onContentChange(appended);
      setTranscriptBuffer("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex space-x-2">
          <button onClick={() => applyFormatting("bold")} className="p-1.5 rounded-md hover:bg-neutral-100 transition-quick" title="Bold">
            <Icon name="Bold" size={18} className="text-neutral-600" />
          </button>
          <button onClick={() => applyFormatting("italic")} className="p-1.5 rounded-md hover:bg-neutral-100 transition-quick" title="Italic">
            <Icon name="Italic" size={18} className="text-neutral-600" />
          </button>
          <button onClick={() => applyFormatting("list")} className="p-1.5 rounded-md hover:bg-neutral-100 transition-quick" title="List">
            <Icon name="List" size={18} className="text-neutral-600" />
          </button>
        </div>

        <div className="flex items-center">
          {isRecording && (
            <span className="body-small text-neutral-500 mr-3 flex items-center">
              <span className="w-2 h-2 rounded-full bg-error mr-2 animate-pulse"></span>
              Listening...
            </span>
          )}
          {autoSaveStatus === "saving" && (
            <span className="body-small text-neutral-500 mr-2 flex items-center">
              <Icon name="Loader" size={14} className="animate-spin mr-1" />
              Saving...
            </span>
          )}
          {autoSaveStatus === "saved" && (
            <span className="body-small text-success mr-2 flex items-center">
              <Icon name="Check" size={14} className="mr-1" />
              Saved
            </span>
          )}
          <button
            onClick={onSave}
            className="px-3 py-1 rounded-lg bg-primary-500 text-white text-sm flex items-center transition-gentle hover:bg-primary-600"
          >
            <Icon name="Save" size={16} className="mr-1" />
            Save
          </button>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`ml-2 px-3 py-1 rounded-lg text-white text-sm flex items-center transition-gentle ${
              isRecording ? "bg-error hover:bg-rose-600" : "bg-neutral-600 hover:bg-neutral-700"
            }`}
            title="Record voice"
          >
            <Icon name={isRecording ? "Square" : "Mic"} size={16} className="mr-1" />
            {isRecording ? "Stop" : "Record"}
          </button>
        </div>
      </div>

      <textarea
  id="journal-textarea"
  value={editorContent}
  onChange={handleChange}
  onKeyDown={handleKeyDown}
  placeholder="Write your thoughts here..."
  className="w-full min-h-[200px] p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none bg-neutral-50 bg-opacity-50 body-medium font-sans text-[15px]"
  style={{
    lineHeight: '24px', // tighter line height
    backgroundImage: 'repeating-linear-gradient(0deg, #e2e8f0 0, #e2e8f0 1px, transparent 1px, transparent 24px)',
    backgroundSize: '100% 24px',
    backgroundPositionY: '8px' // offset to align with top padding
  }}
></textarea>

      {/* Live transcript preview */}
      {transcriptBuffer && isRecording && (
        <div className="mt-3 p-2 rounded-md bg-neutral-50 border border-neutral-200 body-small text-neutral-600">
          {transcriptBuffer}
        </div>
      )}
    </div>
  );
};

export default JournalEditor;
