// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

/************************************************
 *  ****************** FUNÇONS ********************
 * ***********************************************
 */

// ***** Save Bookmark **************************************
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl,
  };

  //   // Local Storage Test
  //   localStorage.setItem("test", "Hello World");
  //   console.log(localStorage.getItem("test"));
  //   localStorage.removeItem("test");
  //   console.log(localStorage.getItem("test"));

  // Test if boomarks is null
  if (localStorage.getItem("bookmarks") === null) {
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // re-set back to LocalStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // Clear Form
  // Borra o contido actual em pantalha do elemento
  document.getElementById("myForm").reset();

  // re-Fetch bookmarks (refresca a lista de bookmarks que se mostram no HTML)
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault(); // impede que submit funcione realmente (necessário para poder visualizá-lo na consola)
}

// ***** Delete Bookmark **************************************
function deleteBookmark(url) {
  // Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Look through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      // Remove from array
      // Array.splice(i, 1) -> borra 1 elemento do array a partir do elemento actual
      bookmarks.splice(i, 1);
    }
  }
  // re-set back to LocalStorage (refresca o ficheiro localStorage)
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // re-Fetch bookmarks (refresca a lista de bookmarks que se mostram no HTML)
  fetchBookmarks();
}

// ***** Fetch Bookmarks **************************************
function fetchBookmarks() {
  // Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Get output id
  var bookmarksResults = document.getElementById("bookmarksResults");

  // Build output
  bookmarksResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="well">' +
      "<h3>" +
      name +
      ' <a class="btn btn-default" target="_blank" href="' +
      url +
      '">Visit</a> ' +
      " <a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" href="#">Delete</a> ' +
      "</h3>" +
      "</div>";
  }
}

// ***** Validate Form **************************************
function validateForm(siteName, siteUrl) {
  // Input baleiro?
  if (!siteName || !siteUrl) {
    alert("Please Fill in the form");
    return false;
  }
  // formato URL incorrecto?
  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if (!siteUrl.match(regex)) {
    alert("Please Use a valid URL!");
    return false;
  }
  return true;
}
