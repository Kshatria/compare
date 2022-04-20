(function () {
    function toggleSameStats () {
        const sameStats = document.querySelectorAll('.js-sameStats');
        sameStats.forEach((el) => {
            if (!el.classList.contains('hidden')) {
                el.classList.add('hidden');
                el.style.maxHeight = '0';
                return
            }

            el.style.maxHeight = `${el.scrollHeight}px`;
            el.classList.remove('hidden');
        })
    }

    const differencesCheckbox = document.querySelector('#differences');
    differencesCheckbox.addEventListener('change', toggleSameStats)
})();
