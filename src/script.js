'use strict'
window.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('.toBuy__addBtn'),
          clearBtn = document.querySelector('.toBuy__clearBtn'),
          filterBtn = document.querySelector('.toBuy__filterBtn'),
          input = document.querySelector('input'),
          list = document.querySelector('.toBuy__list');  

    function deleteItem(e) {
        const target = e.target;
        if (target.matches('button[data-delete]') || target.matches('i.fa-trash')) {
            console.log(target)
            target.closest('li').remove();
            localStorage.setItem("items", list.innerHTML)
        }
        
    }
    function toggleDone(elem) {
        if(elem.classList.contains('btn-pushed')) {
            elem.closest('li').classList.remove('done-item');
            elem.classList.remove('btn-pushed');
            elem.classList.add('btn-active');
        } else {
            elem.closest('li').classList.add('done-item');
            elem.classList.add('btn-pushed')
            elem.classList.remove('btn-active')
        }
        localStorage.setItem("items", list.innerHTML)   
    }
    function checkDone(e) {
        const target = e.target;
        if (target.matches('button[data-done]')) {
            const elem = target;
            toggleDone(elem)
        } else if (target.matches('i.fa-check')) {
            const elem = target.closest('button')
            toggleDone(elem) }
            
        }
    
    function addEmptyItem() {
        const newItem = document.createElement('li');
            newItem.classList.add('list-group-item', 'disabled', 'toBuy__listItem')
            newItem.setAttribute('aria-disabled', 'true')
            newItem.innerHTML= `
                <span>...</span>
                <div class='d-flex justify-content-around'>
                    <button type="button" class="toBuy__btn" data-done>
                        <i class="fas fa-check"></i>
                    </button>
                    <button type="button" class="toBuy__btn " data-delete>
                        <i class="fas fa-trash"></i>
                    </button>
                </div>   
            `
            list.append(newItem)
    }   
    function addNewItem() {
            const emptyItem = document.querySelector('.disabled');
            const text = input.value;
            if(text.length > 0) {
                emptyItem.querySelector('span').textContent = text;
                emptyItem.querySelectorAll('button').forEach(btn => btn.classList.add('btn-active'))
                emptyItem.classList.remove('disabled')
                emptyItem.classList.add('active-item')
                emptyItem.setAttribute('aria-disabled', 'false')
                input.value = ''
                const emptyItems = document.querySelectorAll('.disabled')
                if(emptyItems.length < 2) {
                    addEmptyItem();     
                }
                localStorage.setItem("items", list.innerHTML);
            }
    }
    function clearList() {
        const listItems = document.querySelectorAll('.toBuy__listItem');
            listItems.forEach(item => {
                item.classList.remove('active-item')
                item.classList.add('disabled')
                item.setAttribute('aria-disabled', 'true')
                item.querySelector('span').textContent = '';
                item.classList.remove('done-item')
                item.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('btn-active', 'btn-pushed')
                } )
            })
            input.value = ''
            localStorage.removeItem('items', list.innerHTML);
    }

    function loadItems() {
        const data = localStorage.getItem("items");
        if (data) {
            list.innerHTML = data;
        } 
        list.addEventListener('click', deleteItem);
        list.addEventListener('click', checkDone);
        addBtn.addEventListener('click', () => {
            addNewItem();
            
        }) 
        input.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                addNewItem()
            } 
        })
        clearBtn.addEventListener('click', () => {
            clearList();
        })
    }

    loadItems();

})