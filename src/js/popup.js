(function () {
    let text = 'Удалить все товары?';

    const items = document.querySelectorAll('.item');
    if (items.length <= 1) {
        text = 'Удалить товар?';
    }

    const popup = `
        <div class="popup">
            <div class="popup__overlay js-close-popup"></div>
            <div class="popup__content">
                <button class="popup__btn-close js-close-popup" type="button"></button>
                <p class="popup__text">
                    ${text}
                </p>
                <div class="popup__btns">
                    <button class="popup__btn popup__btn--del js-close-popup" type="button">
                        Удалить
                    </button>
                    <button class="popup__btn popup__btn--cancel js-close-popup" type="button">
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    `;

    const container = document.querySelector('.compare');

    function showPopup () {
        event.preventDefault();
        container.insertAdjacentHTML('beforeend', popup);
        const popupDom = container.querySelector('.popup');
        setTimeout(() => {
            popupDom.classList.add('active');

            const closePopupBtns = document.querySelectorAll('.js-close-popup');
            closePopupBtns.forEach((el) => {
                el.addEventListener('click', hidePopup);
            })
        }, 50)
    }

    function hidePopup () {
        const popupDom = container.querySelector('.popup');
        popupDom.classList.remove('active');
        setTimeout(() => {
            popupDom.remove();
        }, 300)
    }

    const showPopupBtn = container.querySelector('.compare__delete-all');
    showPopupBtn.addEventListener('click', showPopup);
})();
