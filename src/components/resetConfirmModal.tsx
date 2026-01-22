"use client";

export default function ResetConfirmModal({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal" style={{padding:"20px", margin:"15px"}}>
        <h3 className="modal-confirm-title">
          점검상태를 초기화할까요?</h3>
        <p className="modal-confirm-desc">
          점검 상태를 초기화 합니다 <br/>
          <span style={{color:"#4A90E2"}}>확인 완료 →  확인 전 으로 일괄 변경</span>
           </p>
          
        <div className="modal-actions">
          <button className="primary" onClick={onConfirm} >
            확인
          </button>
          <button onClick={onCancel} className="outline">취소</button>
        </div>
      </div>
    </div>
  );
}
