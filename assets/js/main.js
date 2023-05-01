const select = document.getElementById("select")
const inputFilter = document.getElementById("filtro")
const render = document.getElementById("datosRenderizados")


let dataOk = []
let variable
const APIPRINCIPAL = "https://fakerapi.it/api/v1"



select.addEventListener("change", async (e) => {
    variable = e.target.value
    //console.log(variable)

    

    render.innerHTML = `<h2>Loading...</h2>`

    const data = await peticionAlServidor(APIPRINCIPAL,variable)
    dataOk = data.data


    render.innerHTML = ""
    
        showfunction(variable, dataOk)
    



})




inputFilter.addEventListener("keyup", (e) => {
    const newData = dataOk.filter(ele => {
        if (variable === "persons" || variable === "users") return `${ele.firstname.toLowerCase()} ${ele.lastname.toLowerCase()}`.includes(inputFilter.value.toLowerCase())

        if (variable === "addresses") return `${ele.street.toLowerCase()} ${ele.city.toLowerCase()}`.includes(inputFilter.value.toLowerCase())

        if (variable === "books") return `${ele.title.toLowerCase()} ${ele.author.toLowerCase()}`.includes(inputFilter.value.toLowerCase())

        if (variable === "companies") return `${ele.name.toLowerCase()} ${ele.phone.toLowerCase()}`.includes(inputFilter.value.toLowerCase())

    })

    render.innerHTML = ""
    showfunction(variable, newData)
})

//Functions

const showfunction = function (variable, dataOk) {

    switch (variable) {


        case 'addresses':

            dataOk.forEach(ele => {
                render.innerHTML += `
         <p>${ele.id} - calle: ${ele.street}, Ciudad: ${ele.city}</p>
         <hr>`
            })
            break;

        case 'books':
            dataOk.forEach(ele => {
                render.innerHTML += `
            <p>${ele.id} - Titulo: ${ele.title}, Autor: ${ele.author}</p>
            <hr>`
            })

            break;

        case 'companies':
            dataOk.forEach(ele => {
                render.innerHTML += `
                    <p>${ele.id} - Compania: ${ele.name}, Tel: ${ele.phone}</p>
                <hr>`

            })
            break;

        case 'persons':
            dataOk.forEach(ele => {
                render.innerHTML += `
                    <p>${ele.id} - Nombre: ${ele.firstname}, Apellido: ${ele.lastname}</p>
                <hr>`

            })
            break;


        case 'users':
            dataOk.forEach(ele => {
                render.innerHTML += `
                    <p>${ele.id} - Nombre: ${ele.firstname}, Apellido: ${ele.lastname}</p>
                <hr>`

            })
            break;

    }






}





const peticionAlServidor = async function (apiP,variable) {

    const api = `${apiP}/${variable}?_quantity=500`

    try {
        if(variable!==""){
            const response = await fetch(api)
        const data = await response.json()
        return data
        }else{
            return data = ""
        }
        

    } catch (err) {
        console.log(err)
    }




}