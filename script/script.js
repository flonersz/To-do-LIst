class Produto {

    constructor(){
        this.id = 0;
        this.arrayTarefas = [];
        this.editId = null;
    }

    salvar() {
        let tarefa = this.scaning();
        if(this.validacao(tarefa)) {
            if(this.editId == null) {
                this.adicionar(tarefa);
            }
            else {
                this.atualizar(this.editId, tarefa);
            }
            
        }
         
        this.listingTabela();
        this.cancelar();
    }

    listingTabela() {
         let tbody = document.getElementById('tbody');
         tbody.innerText = '';


         for(let i = 0; i < this.arrayTarefas.length; i++) {
            let tr = tbody.insertRow();
            let td_check = tr.insertCell();
            let td_tarefa = tr.insertCell();
            let td_funcao = tr.insertCell();

            td_tarefa.innerText = this.arrayTarefas[i].nome;
            

            let imgEdit = document.createElement('img');
            imgEdit.src = 'image/edit.png';
            imgEdit.setAttribute("onclick", "produto.editar("+ JSON.stringify(this.arrayTarefas[i]) +")");

            td_funcao.appendChild(imgEdit);

            let imgDelete = document.createElement('img');
            imgDelete.src = 'image/delete.png';
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayTarefas[i].id+")");

            td_funcao.appendChild(imgDelete);

            let checkbox = document.createElement('input')
            checkbox.type = 'checkbox';

            td_check.appendChild(checkbox)

         }
    }

    adicionar(tarefa) {
        this.arrayTarefas.push(tarefa);
        this.id++;
    }

    scaning() {
        let tarefa = {}

        tarefa.id = this.id
        tarefa.nome = document.getElementById('tarefa').value;

        return tarefa;
    }

    validacao(tarefa) {
        let msg = '';

        if(tarefa.nome == '') {
            msg += '- Digite a tarefa'
        }

        if(msg != '') {
            alert(msg);
            return false
        }

        return true;
    }
    

    cancelar() {
        document.getElementById('tarefa').value = '';

        document.getElementById('butao1').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id) {

        if(confirm('Deseja deletar esta tarefa ?')) {
            for(let i = 0; i < this.arrayTarefas.length; i++) {
                if(this.arrayTarefas[i].id == id) {
                    this.arrayTarefas.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
        
    }

    atualizar(id, tarefa) {
        for(let i = 0; i < this.arrayTarefas.length; i++) {
            if(this.arrayTarefas[i].id == id) {
                this.arrayTarefas[i].nome = tarefa.nome
            }
        }
    }

    editar(dados) {
        this.editId = dados.id;

        document.getElementById('tarefa').value = dados.tarefa;

        document.getElementById('butao1').innerText = 'Atualizar';
    }
}

var produto = new Produto();