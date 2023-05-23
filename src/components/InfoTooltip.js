import React from "react";
import successImg from "../images/success.svg";
import failImg from "../images/fail.png";

function InfoTooltip({ isOpen, onClose, isSuccess, errorMessage }) {
  return (
    <div
      className={`popup popup_type_info-notification ${
        isOpen && "popup_is-opened"
      }`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close"
          onClick={onClose}
        />
        <div className="popup__info">
          {isSuccess ? (
            <img className="popup__info-image" src={successImg} alt="Success" />
          ) : (
            <img className="popup__info-image" src={failImg} alt="Fail" />
          )}
          <h2 className="popup__text">
            {isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
          <h2 className="info__error">{errorMessage}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
