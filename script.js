const form = document.querySelector('#person-form');
const userList = document.querySelector('#person-list');

function Persona(nombre, edad, genero) {
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
    this.id = Date.now();
}

function Empleado(nombre, edad, genero, puesto, salario, fecha) {
    Persona.call(this, nombre, edad, genero);
    this.puesto = puesto;
    this.salario = salario;
    this.fecha = fecha;
    this.id = Date.now();
}

function IU() {
    this.usuarios = [];
}
IU.prototype.addUser = function(obj) {
    this.usuarios.push(obj);
    this.renderUser();
    this.saveStorage();
}

IU.prototype.renderUser = function() {
    userList.innerHTML = '';
    this.usuarios.forEach(user => {
        const {nombre, edad, genero, puesto, salario, fecha, id} = user;
        const userLi = document.createElement('li');
        userLi.dataset.id = id;
        userLi.innerHTML = `
        <span><b>Nombre:</b> ${nombre}</span> 
        <span><b>Edad:</b> ${edad}</span> 
        <span><b>Genero:</b> ${genero}</span>
        <button class="delete-btn">Eliminar</button>
        `;
        if(puesto || salario || fecha) userLi.innerHTML = `
        <span><b>Nombre:</b> ${nombre}</span> 
        <span><b>Edad:</b> ${edad}</span> 
        <span><b>Genero:</b> ${genero}</span>
        <span><b>Puesto:</b> ${puesto}</span> 
        <span><b>Salario:</b> ${salario}</span> 
        <span><b>Fecha:</b> ${fecha}</span>
        <button class="delete-btn">Eliminar</button>
        `;
        if(puesto && salario && fecha) {
            const type = document.createElement('span');
            type.className = 'type';
            type.textContent = 'Empleado';
            userLi.insertAdjacentElement('afterbegin', type);
        } else {
            const type = document.createElement('span');
            type.className = 'type';
            type.textContent = 'Persona';
            userLi.insertAdjacentElement('afterbegin', type);
        }
        userList.appendChild(userLi);
    })
}

IU.prototype.deleteElement = function(id) {
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    this.renderUser();
    this.saveStorage();
}

IU.prototype.saveStorage = function() {
    localStorage.setItem('users', JSON.stringify(this.usuarios));
}
const interfaz = new IU();

document.addEventListener('DOMContentLoaded', ()=> {
    interfaz.usuarios = JSON.parse(localStorage.getItem('users')) || [];
    interfaz.renderUser();
});
form.addEventListener('submit', validarFormulario);

userList.addEventListener('click', e => {
    if(e.target.classList.contains('delete-btn')) {
        const elementSelect = e.target.parentElement.getAttribute('data-id');
        interfaz.deleteElement(parseInt(elementSelect));
    }
});

function validarFormulario(e) {
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const edad = document.querySelector('#edad').value;
    const genero = document.querySelector('#genero').value;
    const puesto = document.querySelector('#puesto').value;
    const salario = document.querySelector('#salario').value;
    const fechaContratacion = document.querySelector('#fechaContratacion').value;

    if(puesto || salario || fechaContratacion) {
        if(nombre && edad && genero && puesto && salario && fechaContratacion) {
            const empleado = new Empleado(nombre, edad, genero, puesto, salario, fechaContratacion);
            interfaz.addUser(empleado);
        }
        return;
    }
    if(nombre && edad && genero) {
        const persona = new Persona(nombre, edad, genero);
        interfaz.addUser(persona);
    }

    
}