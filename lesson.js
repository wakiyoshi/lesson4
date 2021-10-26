
fetch("https://opentdb.com/api.php?amount=10",{
  method: 'GET',
  // mode: 'same-origin',
  // credentials: 'include'
})
.then(response => response.json())
.then(text => console.log(text))
.catch((error) => console.log(error));

    
  