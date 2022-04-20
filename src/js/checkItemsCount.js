function checkItemsCount () {
    const compare = document.querySelector('.compare');
    const table = compare.querySelector('.table');
    const filter = compare.querySelector('.compare__filter');
    const differences = compare.querySelector('.compare__differences');
    const items = compare.querySelectorAll('.item');

    switch (items.length) {
        case 0:
            compare.classList.add('empty-cart');
            break
        case 1:
            table.style.display = 'none';
            filter.style.display = 'none';
            differences.style.display = 'none';
            addLinkEmptyItem();
    }
}

function addLinkEmptyItem () {
    const emptyItemLink = `
        <article class="swiper-slide item item--empty">
            <a href="#" class="item__wrapper">
                <div class="item__decor"></div>
                <p class="item__text">
                    Добавьте еще товаров для сравнения
                </p>
            </a>
        </article>
    `

    const itemsContainer = document.querySelector('.compare__items-wrapper');
    itemsContainer.insertAdjacentHTML('beforeend', emptyItemLink);
}

checkItemsCount ();
