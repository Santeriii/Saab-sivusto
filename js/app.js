const form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    // prevent page from reloading when form is submitted
    event.preventDefault();
    // get the value of the input field
    const input = document.querySelector('.searchForm-input').value;
    // remove whitespace from the input
    const searchQuery = input.trim();
    // print `searchQuery` to the console
    console.log(searchQuery);
}