(function () {
  'use strict';
/*
 *
 * Base Declaration
 *
 * */


// Declaration of Input Field
  var purchase       = document.querySelectorAll( '.purchase' );
  var cart_item      = document.getElementById( 'cart-item' );
  var cart_price     = document.getElementById( 'cart-price' );
  var btn_clear_cart = document.getElementById( 'btn-clear-cart' );
  var close_cart     = document.querySelector( '.close-cart' );
  var inp_promo      = document.getElementById('promo');

// Declare Variables for Cart Box and Promo Code
  var cart = [];
  var promo = [ 'promo10%', 'promo15%', 'promo5%'];

// Create Constructor for Items
  var Item = function ( name, price, count ) {
    this.name  = name;
    this.price = price;
    this.count = count;
  };

  /*
  *
  * DOM Manipulation - UI Interaction
  *
  * */

  // Loop to every Button and add Eventlistener
  for ( var i = 0; i < purchase.length; i++ ) {
    //  Button Click - Add Item to Cart and Aside Element
    purchase[i].addEventListener( 'click', function () {
      var name  = this.getAttribute( 'data-name' );
      var price = parseInt( this.getAttribute( 'data-price' ) );

      // Add new Item to Cart
      addItemToCart( name, price, 1 );
      console.log( cart );

      // Update Aside Counter and total Price
      cart_price.innerHTML = totalCart();
      cart_item.innerHTML  = countCart();

      // Render Items in Table
      displayCart();
    }, false );
  }

  // Remove one Item per Product from Cart
  document.getElementById( 'show-cart' ).addEventListener('click', function ( e ) {
    // Check clicked element class name
    if (e.toElement.className === 'fa fa-times delete_item') {
      // save product name in temp variable
      var pName = e.path[2].firstChild.textContent;
      removeItemFromCart( pName );
    }
    displayCart();
    cart_price.innerHTML = totalCart();
    cart_item.innerHTML  = countCart();
  });

  // Delete Item from Cart Table and Aside Element
  btn_clear_cart.addEventListener( 'click', function () {
    // event.preventDefault();
    clearCart();
    // Set counters to Null
    document.getElementById( 'show-cart' ).innerHTML = '';
    cart_item.innerHTML                              = '';
    cart_price.innerHTML                             = '';
  }, false );

  // Update Price using Promo Code
  if (inp_promo) {
    inp_promo.addEventListener( 'input', function ( e ) {
      cart_price.innerHTML = totalCart();
      displayCart();
    } );
  }

  // Close Cart
  close_cart.addEventListener( 'click', function () {
    document.getElementById( 'cart-list' ).classList.add( 'toggle-shopping-cart' );
  }, false );

  // Show Cart
  cart_item.addEventListener( 'click', function () {
    document.getElementById( 'cart-list' ).classList.remove( 'toggle-shopping-cart' );
  }, false );

  // Render Shopping Cart Item
  function displayCart() {
    console.log( '**** Display the Cart*****' );
    var cartArray = listCart();
    console.log( '**** Count Cart: ' + cartArray.length );
    var totalCost = totalCart();
    var output    = '';
    for ( var i in cartArray ) {
      var count = cartArray[i].count;
      output += '<tr class="tabl-row"><td>' + cartArray[i].name + '</td>';
      output += '<td><input type="number" value="' + count + '" ></td>';
      output += '<td>' + cartArray[i].price + ' €' + '</td>';
      output += '<td>' + totalCost + ' €' + '</td>';
      output += '<td><i style="color:red; cursor: pointer" class="fa fa-times delete_item" aria-hidden="true"></i></td>';
      // document.getElementById('show-cart').children[i].children[1].children[0].value = count;
    }
    document.getElementById( 'show-cart' ).innerHTML = output;
  }

/*
 *
 * Business Logic - add - remove - save - load
 *
 * */

  // Add Item in Shopping Cart
  function addItemToCart( name, price, count ) {
    for ( var i in cart ) {
      if ( cart[i].name === name ) {
        cart[i].count += count;
        return;
      }
    }
    var item = new Item( name, price, count );
    cart.push( item );
    saveCart();
  }

  // Remove Item from Shopping Cart
  function removeItemFromCart( name ) { // remove only one item
    for ( var i in cart ) {
      if ( cart[i].name === name ) {
        cart[i].count--;
        if ( cart[i].count === 0 ) {
          cart.splice( i, 1 );
        }
      }
    }
    saveCart();
  }

  // Remove all Items from Shopping Cart
  function removeItemFromCartAll( name ) { // remove all items in cart
    for ( var i in cart ) {
      if ( cart[i].name === name ) {
        cart.splice( i, 1 );
        return;
      }
    }
    saveCart();
  }

  // Clear Cart
  function clearCart() { // clear whole Cart
    cart = [];
    saveCart();
  }

  // Count Total Items in Cart
  function countCart() {
    var totalCount = 0;
    for ( var i in cart ) {
      totalCount += cart[i].count;
    }
    return totalCount;
  }

  // Total Cost of all Items
  function totalCart() {
    var totalCost = 0;
    for ( var i in cart ) {
      totalCost += cart[i].price * cart[i].count;
    }
    totalCost = promoCostCart(totalCost);
    return totalCost;
  }

  // Total Cost Calculation Promo Code
  function promoCostCart(cost) {
    var costTotal = 0;
    if (inp_promo.value === 'promo5%') {
      var less5 = cost / 100 * 5;
      costTotal = (cost - less5);
    } else if (inp_promo.value === 'promo10%') {
      var less10 = cost / 100 * 10;
      costTotal = (cost - less10);
    } else if (inp_promo.value === 'promo15%') {
      var less15 = cost / 100 * 15;
      costTotal = (cost - less15);
    } else {
      costTotal = cost;
    }
    return costTotal;
  }

  // Copy Cart Items to new Object -> array of items
  function listCart() {
    var cartCopy = [];
    for ( var i in cart ) {
      var item     = cart[i];
      var itemCopy = {};
      for ( var p in item ) {
        itemCopy[p] = item[p];
      }
      cartCopy.push( itemCopy );
    }
    return cartCopy;
  }

  // Save Shopping Cart to local storage
  function saveCart() {
    localStorage.setItem( 'shoppingCart', JSON.stringify( cart ) );
  }

  // Load Shopping Cart from local storage
  function loadCart() {
    cart = JSON.parse( localStorage.getItem( 'shoppingCart' ) );
  }

/*
 *
 * Update Site Information
 *
 * */


  loadCart();
  displayCart();
  cart_price.innerHTML = totalCart();
  cart_item.innerHTML  = countCart();
})();
