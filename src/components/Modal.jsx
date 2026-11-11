function Modal({ isOpen, title, message, onConfirm, onCancel, confirmText = "OK", cancelText, type = "info", children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel || onConfirm}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className={`modal-title ${type}`}>{title}</h2>
        {message && <p className="modal-message">{message}</p>}

        {children}

        <div className="modal-actions">
          {cancelText && (
            <button className="modal-btn cancel" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button className={`modal-btn confirm ${type}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;