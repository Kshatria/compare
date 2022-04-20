(function () {
    localStorage.clear();

    var tableScroll = new Swiper(".table__scroll", {
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        scrollbar: {
            el: ".compare__scrollbar",
            draggable: true,
        },
        allowTouchMove: false,
    });
    
    var compareSlider = new Swiper(".compare__items-container", {
        freeMode: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        slidesPerView: 'auto',
        scrollbar: {
            el: ".compare__scrollbar",
            draggable: true,
        },
        allowTouchMove: false,
    });

    function blockLastItem () {
        const items = document.querySelectorAll('.item');
        const pinItems = document.querySelectorAll('.item.pin');
        if (items.length === pinItems.length + 1) {
            return true;
        }
        return false;
    }

    function calculatePositionPinItems (elWrap) {
        const itemsPin = elWrap.querySelectorAll('.pin');
        itemsPin.forEach((el, index) => {
            el.style.left = `${el.offsetWidth * index}px`;
        })
    }

    function calculatePositionItem (el, elWrap, slider) {
        const pinItem = el.querySelector('.item__btn--pin');

        if (el.classList.contains('pin')) {
            if (pinItem) pinItem.classList.remove('active');
            el.style.zIndex++;
            const itemLocalPos = localStorage.getItem(`${el.getAttribute('data-id')}`);
            el.style.left = `${itemLocalPos}px`;
            elWrap.style.paddingLeft = `${checkCountPinItems() - el.offsetWidth}px`;
            setTimeout(() => {
                el.classList.remove('pin');
                calculatePositionPinItems(elWrap);
                el.style.left = `auto`;
            }, 500)
            return
        }

        if (blockLastItem()) return;

        localStorage.setItem(`${el.getAttribute('data-id')}`, `${el.offsetLeft}`);
        if (pinItem) pinItem.classList.add('active');
        el.style.left = `${el.offsetLeft}px`;
        el.classList.add('pin');
        el.style.zIndex++;
        setTimeout(() => {
            el.style.left = `${checkCountPinItems() - el.offsetWidth}px`;
            elWrap.style.paddingLeft = `${checkCountPinItems()}px`;
            setTimeout(() => {
                slider.update();
            }, 500);
        }, 100);
    }

    function pinItem (slider, table) {
        event.preventDefault();
        const tableWrap = document.querySelector('.table__scroll-wrap');
        const sliderWrap = document.querySelector('.compare__items-wrapper');
        const item = event.target.closest('.item');
        const itemStats = document.querySelector(`.table__stats[data-id="${item.getAttribute('data-id')}"]`);

        calculatePositionItem(item, sliderWrap, slider);
        calculatePositionItem(itemStats, tableWrap, table);
    }

    function checkCountPinItems () {
        const itemsPin = document.querySelectorAll('.item.pin');
        const result = itemsPin[0].offsetWidth * itemsPin.length;
        return result;
    }

    const itemsPinBtn = document.querySelectorAll('.item__btn--pin');
    if (itemsPinBtn) {
        itemsPinBtn.forEach((el) => {
            el.addEventListener('click', () => pinItem(compareSlider, tableScroll))
        })
    }
})();
