const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addresInput = document.getElementById('addres')
const addresWarn = document.getElementById('addres-warn')

cartBtn.addEventListener('click', acessar);


let cart = []
//Abrir o modal do carrinho
function acessar() {
    cartModal.style.display = 'flex'
    updateCartModal();
}

//Fechar o modal quando clicar fora
cartModal.addEventListener('click', function(event) {
    console.log(event)
    if (event.target === cartModal) {
        cartModal.style.display = 'none'
    }
})

closeModalBtn.addEventListener('click', function(){
    cartModal.style.display = 'none'
})


menu.addEventListener('click', function(event) {




    let parentButton = event.target.closest('.add-to-cart-btn')

    if(parentButton) {
        const name = parentButton.getAttribute('data-name')
        const price = parseFloat(parentButton.getAttribute('data-price')).toFixed(2);

        addToCart(name, price);
    }

    
})
//Adicionar no Carrinho

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);


    if (existingItem) {
        //Se o item já existe, aumenta apenas a quantidade + 1
        existingItem.quantity += 1;

    }
    else {
        cart.push({
            name,
            price,
            quantity: 1,
        })

        
    }
    updateCartModal()
    
}
    

function updateCartModal() {
    //Atualiza o Carrinho
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col');

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
            <p class= "font-medium">${item.name}</p>
            <p>Quantidade: ${item.quantity}</p>
            <p class= "font-medium mt-2">R$ ${item.price}</p>
            </div>
        

        <button class="remove-from-cart-btn" data-name="${item.name}">
            Remover
        </button>

        </div> 

        
        `
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    })

    cartTotal.textContent = total.toLocaleString("pt-br", {style: 'currency', currency: 'BRL'});

    cartCounter.innerHTML = cart.length;


}
cartItemsContainer.addEventListener ('click', function(event) {
    if(event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");

        removeItemCart(name);
    }


})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name)

    if (index !== -1) {
        const item = cart[index];
        console.log(item);

        if (item.quantity > 1) {
            item.quantity --;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

addresInput.addEventListener('input', function(event){
   let inputValue = event.target.value;

   if(inputValue !== "") {
    addresInput.classList.remove('border-red-500');
    addresWarn.classList.add('hidden');
    console.log(addresInput);
   }
})

checkoutBtn.addEventListener('click', function(){
    if (cart.length === 0) return;

    if(addresInput.value === "") {
        addresWarn.classList.remove("hidden");
        addresInput.classList.add("border-red-500");
    }
})

function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora > 22;
}

const spanItem = document.getElementById('date-span');
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
}
else {
    spanItem.classList.add("bg-red-500")
    spanItem.classList.remove("bg-green-600")
    
}



//esse addEventListener com a fuction(event) indentifica aonde na tela está sendo clicado

// o event.target.closest('') identifica o item e seu parente para que mesmo que você clique no ícone em vez do botão, o botão funcione 

//no event target é necessário indentificar o id ou classe que vai ser indentificado, se for id colocar # se for classe colocar ponto
//o forEach() percorre a lista 