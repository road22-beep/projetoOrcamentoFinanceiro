class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null){
				return false
			}
		}
		return true
	}

	limparCampos() {
		document.getElementById().reset();
	}
}

class Bd {
	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}
	
	getProximoId(){
		let proximoId = localStorage.getItem('id')

		return parseInt(proximoId) + 1
	}

	gravar (d) {
	let id = this.getProximoId()

	localStorage.setItem(id, JSON.stringify(d))

	localStorage.setItem('id', id)
	}

	recuperarTodosRegistros() {
		let despesas = Array()

		let id = localStorage.getItem('id')

		//recuperar todas as despesas armazenadas
		for ( let i = 1; i <= id; i++) {
			let despesa = JSON.parse(localStorage.getItem(i))

			if(despesa === null){
				continue
			}

			despesa.id = i
			despesas.push(despesa)
		}
		return despesas
	}

	pesquisar (despesa) {
		let despesasFiltradas = Array()

		despesasFiltradas = this.recuperarTodosRegistros()

		//um filter para cada input
		//ano
		if(despesa.ano != ''){
		despesasFiltradas = despesasFiltradas.filter(f => f.ano == despesa.ano)
		}
		//mes
		if(despesa.mes != ''){
		despesasFiltradas = despesasFiltradas.filter(f => f.mes == despesa.mes)
		}
		//dia
		if(despesa.dia != ''){
		despesasFiltradas = despesasFiltradas.filter(f => f.dia == despesa.dia)
		}
		//tipo
		if(despesa.tipo != ''){
		despesasFiltradas = despesasFiltradas.filter(f => f.tipo == despesa.tipo)
		}
		//descricao
		if(despesa.descricao != ''){
		despesasFiltradas = despesasFiltradas.filter(f => f.descricao == despesa.descricao)
		}
		//valor
		if(despesa.valor != ''){
		despesasFiltradas = despesasFiltradas.filter(f => f.valor == despesa.valor)
		}

		return despesasFiltradas
	}

	remover (id) {
		localStorage.removeItem(id)
	}
}

let bd = new Bd()

function cadastrardespesa() {
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')
	

	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	)

	if (despesa.validarDados()) {
		bd.gravar(despesa)

		document.getElementById('tituloModal').innerHTML = 'Armazenado com sucesso'	
		document.getElementById('classeTitulo').className = 'modal-header text-success'
		document.getElementById('corpoModal').innerHTML = 'Os <strong>dados</strong> foram armazenado com sucesso.'
		document.getElementById('botaoModal').className = 'btn btn-success'
		document.getElementById('botaoModal').innerHTML = 'OK'

		$('#modal').modal('show')

		ano.value = '',
		mes.value = '',
		dia.value = '',
		tipo.value = '',
		descricao.value = '',
		valor.value = ''
	} else {
		document.getElementById('tituloModal').innerHTML = 'Erro no formulários'	
		document.getElementById('classeTitulo').className = 'modal-header text-danger'
		document.getElementById('corpoModal').innerHTML = 'Campos <strong>obrigatórios</strong> não preenchidos ou preenchidos incorretamente.'
		document.getElementById('botaoModal').className = 'btn btn-danger'
		document.getElementById('botaoModal').innerHTML = 'Corrigir'
		

		$('#modal').modal('show')
	}
	
}

function carregaListaDespesas() {

	let despesas = Array()

	despesas = bd.recuperarTodosRegistros()

	//percorre o array despesas listando cada despesa de forma dinamica
	let listaDespesas = document.getElementById('listaDespesas')

	despesas.forEach(function(d){
		//criando linhas(tr)
		let linha = listaDespesas.insertRow()

		//criando colunas(td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		

		//ajustar tipo
		switch(d.tipo) {
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
		}	

		linha.insertCell(1).innerHTML = `${d.tipo}`
		linha.insertCell(2).innerHTML = `${d.descricao}`
		linha.insertCell(3).innerHTML = `${d.valor}`

		//criar botao excluir 
		let botao = document.createElement("button")
		botao.className = 'btn btn-danger'
		botao.innerHTML= '<i class="fas fa-times"></i>'
		botao.id = `${d.id}`
		linha.insertCell(4).append(botao)
		botao.onclick = function () {
			$('#modalConfirmacao').modal('show')
		}
		document.getElementById('deleteConfirma').onclick = function () {
			let id = botao.id

			bd.remover(id)

			window.location.reload()
		}
	})
}



function perquisarDespesas() {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)

	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''

	despesas.forEach(function(d){
		//criando linhas(tr)
		let linha = listaDespesas.insertRow()

		//criando colunas(td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		

		//ajustar tipo
		switch(d.tipo) {
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
		}	

		linha.insertCell(1).innerHTML = `${d.tipo}`
		linha.insertCell(2).innerHTML = `${d.descricao}`
		linha.insertCell(3).innerHTML = `${d.valor}`

		//criar botao excluir 
		let botao = document.createElement("button")
		botao.className = 'btn btn-danger'
		botao.innerHTML= '<i class="fas fa-times"></i>'
		botao.id = `${d.id}`
		linha.insertCell(4).append(botao)
		botao.onclick = function () {
			$('#modalConfirmacao').modal('show')
		}
		document.getElementById('deleteConfirma').onclick = function () {
			let id = botao.id

			bd.remover(id)

			window.location.reload()
		}
	})


}