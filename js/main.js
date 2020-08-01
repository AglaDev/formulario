
window.onload = ()=>{


let form = document.getElementsByTagName('form')[0]
let btn = document.querySelector('.btn')

const usuario = {
	_nome:'',
	_idade:0,
	_sexo:'',
	_email:'',
	_cidade:'',
	_uf:'',
	
	get nome(){
		return this._nome
	},
	set nome(nome){
		this._nome = nome
	},
	get idade(){
		return this._idade
	},
	set idade(idade){
		this._idade = idade
	},
	get sexo(){
		return this._sexo
	},
	set sexo(sexo){
		this._sexo = sexo
	},
	get email(){
		return this._email
	},
	set email(email){
		this._email = email
	},
	get cidade(){
		return this._cidade
	},
	set cidade(cidade){
		this._cidade = cidade
	},
	get uf(){
		return this._uf
	},
	set uf(uf){
		this._uf = uf
	}



}


function getCampos(form){

	let elements = form.elements
	//Transforma o html collection em array
	elements = Array.from(elements)
	let elementos = []


	elements.forEach((e)=>{

		if(e.type !== 'submit'){

			elementos.push(e)
		}

	})
	
	validaCampos(elementos)


}


function validaCampos(elementos){

	let qtd = 0
	let vazios = []
	elementos.forEach((e,i)=>{

		if(e.value == ''){

			qtd++
			//console.log(`O campo ${e.getAttribute('ide')} está vazio!`)

			e = e.getAttribute('ide')

			vazios.push(e)

				
		}		

	})
	
	notificacao(vazios)
			
	if(qtd==0){

		let valores = []
		let nomesValores = [] 

		for(let i in elementos){

			valores.push(elementos[i].value)
			nomesValores.push(elementos[i].getAttribute('ide'))
			nomesValores[i] = nomesValores[i].toLowerCase()
		}
		
		
		insereDados(valores,nomesValores)
		//console.log(nomesValores)

	}
	console.log(`quantidade de vazios: `+qtd)


}


function insereDados(elements,nomes){

	for(let i = 0; i < elements.length; i++){
		
		usuario[nomes[i]] = elements[i]

	}
	
	console.log(usuario)

}

function openBox(box,elements){
	let status = 0
	
	if(status==0){

		box.classList.toggle('box-notification-toggle')
		status = 1
	}

	let btnClose = document.querySelector('.close-box')



	
	openErros(box,elements)
	

}

function closeErro(box,element){
	let htmlItem = document.querySelector(`.erro${element}`)
	box.removeChild(htmlItem)
}

function openErros(box,items){

	items.forEach((e,i)=>{
		let msg =`${i+1} - O campo ${e} está vazio`
		let item =  document.createElement('li')
		item.setAttribute('class',`notification notif-erro erro${e}`)
		let p = document.createElement('p')
		p.innerHTML = msg
		item.appendChild(p)
		box.appendChild(item)


	})

	let elementsHtml = []

	items.forEach((e,i)=>{

		elementsHtml.push(document.querySelector(`[ide=${e}]`))
		let a = elementsHtml[i]
		a.addEventListener('focusout',()=>{
			
			if(a.value != ''){

				console.log(`${e } ja não é mais vazio`)
				closeErro(box,e)

			}

		})
		
	})

}


function notificacao(elements){

	let box = document.querySelector('.box-notification')

	if(elements.length>0){
		
		openBox(box,elements)

	}
	//elements.forEach(e=>{
	//	console.log(e)

	//})

}


btn.addEventListener('click',e=>{
	e.preventDefault()

	
	getCampos(form)

})



}