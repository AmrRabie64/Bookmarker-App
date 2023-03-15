//------------Start Global

var documentHtml = document ;

var siteName = documentHtml.getElementById("siteName") , 
siteUrl = documentHtml.getElementById("siteUrl"),
btnAdd = documentHtml.getElementById("btnAdd"),
searchBook = documentHtml.getElementById("searchBook"),
alertName = documentHtml.getElementById("alertName"),
alertUrl = documentHtml.getElementById("alertUrl"),
alertExite = documentHtml.getElementById("alertExite"),
booksContainer = [],
indexUpdate = 0 ;



//------------When Start
if(getLocal() !== null){
    booksContainer = getLocal();
    displayData();
}



//------------Start Events

btnAdd.onclick = function(){
    addBook();
    
}

btnUpdate.onclick = function(){
    updateData();
}

searchBook.oninput = function(){
    searchData();
}


//------------Start Function

function addBook (){



    if(nameValidation() === true && urlValidation() === true){
        var book = {
            name:siteName.value,
            url:siteUrl.value
        }
        booksContainer.push(book);
        nameValidation();
        displayData();
        setLocal();
    
        resetForm();
    }
    
}

function displayData(){
    var tableData = "";
    var term = searchBook.value.toLowerCase();
    for (var i = 0 ; i < booksContainer.length ; i++){
        if (booksContainer[i].name.toLowerCase().includes(term)){
            tableData +=`
        <tr>
              <td>${booksContainer[i].name.toLowerCase().replaceAll(term,`<span class="bg-warning">${term}</span>`)} </td>
              <td>
                <p class="small  text-truncate" style="max-width: 300px;">${booksContainer[i].url}</p>
              </td>
              <td>
                <div class="hstack gap-2 justify-content-center">
                  <a href="${booksContainer[i].url}" target="_blank" class="btn btn-outline-dark">
                    <div><i class="fa-solid fa-eye"></i></div>
                  </a>

                  <button class="btn btn-outline-warning" onclick="setUpdateBook(${i})">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>

                  <button class="btn btn-outline-danger"  onclick="deleteRow(${i})">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>

              </td>
            </tr>
        `
        }
        
    }

    documentHtml.getElementById("tableBody").innerHTML = tableData

}

function setUpdateBook(index){
     indexUpdate = index

    siteName.value = booksContainer[index].name
    siteUrl.value = booksContainer[index].url

    btnAdd.classList.add('d-none')
    btnUpdate.classList.remove('d-none')

  
}

function updateData(){
    var book = {
        name:siteName.value,
        url:siteUrl.value,
    };

    booksContainer.splice(indexUpdate,1,book);
    setLocal();
    displayData();
    resetForm();
    btnUpdate.classList.add('d-none');
    btnAdd.classList.remove('d-none');
   

}

function searchData(){
    displayData();
}


function deleteRow (index){
    booksContainer.splice(index,1);
    setLocal();
    displayData();

}

function resetForm(){
    siteName.value=''
    siteUrl.value=''
}

function setLocal(){
    localStorage.setItem("booksContainer", JSON.stringify(booksContainer))
}

function getLocal(){
    return JSON.parse(localStorage.getItem("booksContainer"));
}



//------------Start Validation

function nameValidation(){
    if (siteName.value === ''){
        alertName.classList.remove('d-none')
        return false;
    }else{
        alertName.classList.add('d-none')
        return true;
    }
}

function urlValidation(){
    if (siteUrl.value === ''){
        alertUrl.classList.remove('d-none')
        return false;
    }else{

        var isExite = false;

        for(var i = 0; i < booksContainer.length; i++){
            if (booksContainer[i].url === siteUrl.value){
                isExite = true;

                break;
            }
        }

        if(isExite === true){
            alertExite.classList.remove("d-none")
            return false;
        }else{
            alertExite.classList.add("d-none")
    
        }


        alertUrl.classList.add('d-none')
        return true;
    }
}