import {
    getProductos,
    registrarProducto,
    eliminarProducto,
    updateProducto,
    getProductoById
} from "./firebase.js";

let productos = []
let editar = false
let producto = {}

/*Seleccionamos elementos del DOM*/
const tabla = document.getElementById('tabla');
const btn_nuevo = document.getElementById('nuevo');

/**Modal*/
const btn_cancelar = document.getElementById('cancelar');
const btn_registrar = document.getElementById('registrar');
const modal = document.getElementById('modal');

const eliminiProducto = (id) =>{
    eliminarProducto(id)
    tabla.innerHTML = ''
    cargarProductosEnTabla()

}

const venderProduto = async(id) => {
    const producto = (await getProductoById(id)).data();
    const cantidadComprar = parseInt(prompt('Digita cantidad a vender'))

    const cantidadExistente = parseInt(producto.unidades)
    if(cantidadComprar <= cantidadExistente){
        updateProducto(id, {unidades: (cantidadExistente - cantidadComprar)})
        tabla.innerHTML = ''
        cargarProductosEnTabla()
        alert('Compra realizada con exito')
    }else{
        alert('La cantidad a comprar supera el numero de unidades existentes')
    }
}
/**Obtenemos Productos*/
const getProducto = (id,cod,nom,pre,uni,fec,) => {
    const item = document.createElement('tr');
    const codigo = document.createElement('td');codigo.innerText = cod
    const nombre = document.createElement('td');nombre.innerText = nom
    const presentacion = document.createElement('td');presentacion.innerText = pre
    const unidades = document.createElement('td');unidades.innerText = uni
    const fecha = document.createElement('td');fecha.innerText = fec
    const btn = document.createElement('button');btn.textContent='Eliminar';
    btn.addEventListener('click',()=>eliminiProducto(id));
    btn.style.backgroundColor = 'red';
    btn.style.border = 'none'
    btn.style.color = 'white';
    btn.style.fontWeight = 'bold';
    const btn_vender = document.createElement('button');btn_vender.textContent='Vender';
    btn_vender.addEventListener('click',()=> venderProduto(id));
    btn_vender.style.backgroundColor = 'green';
    btn_vender.style.border = 'none'
    btn_vender.style.color = 'white';
    btn_vender.style.fontWeight = 'bold';
    btn_vender.style.marginLeft = '10px';

    item.appendChild(codigo);
    item.appendChild(nombre);
    item.appendChild(presentacion);
    item.appendChild(unidades);
    item.appendChild(fecha)
    item.appendChild(btn);
    item.appendChild(btn_vender)

    return item 
}
/**Cargamos productos en la tabla*/
const cargarProductosEnTabla =async () =>{
    productos = await getProductos()   
    productos.forEach(producto => {
        tabla.appendChild(getProducto(producto.id,producto.codigo,producto.nombre,producto.presentacion,producto.unidades,producto.fecha));
    })

}

btn_nuevo.addEventListener('click', () =>{
    modal.classList.remove('modal-close');
    modal.classList.add('modal');
})

btn_cancelar.addEventListener('click',()=>{
    modal.classList.add('modal-close');
});


btn_registrar.addEventListener('click', async()=>{

    /**Capturamos informacion formulario*/
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const presentacion = document.getElementById('presentacion').value;
    const unidades = document.getElementById('unidades').value;
    const fecha = document.getElementById('fecha').value;

    await registrarProducto(codigo,nombre,presentacion,unidades,fecha)
    tabla.innerHTML = ''
    cargarProductosEnTabla()
    alert('Producto registro')

});

setTimeout(() => {
    cargarProductosEnTabla()
},500);