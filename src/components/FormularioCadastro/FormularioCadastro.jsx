import React, { Component } from "react";
import "./estilo.css"

class FormularioCadastro extends Component{

    constructor(props){
        super(props);
        this.titulo = "";
        this.texto = "";
        this.categoria = "Sem Categoria";
        this.state = {categorias:[]};
        this._novasCategorias = this._novasCategorias.bind(this);
    }

    componentDidMount(){
        this.props.categorias.inscrever(this._novasCategorias);
    }

    componentWillUnmount(){
        this.props.categorias.desinscrever(this._novasCategorias);
    }

    _novasCategorias(categorias){
        this.setState({...this.state, categorias});
    }

    _handlerMudancaTitulo(evento){
        evento.stopPropagation();
        this.titulo = evento.target.value;
    }

    _handlerMudacaTexto(evento){
        evento.stopPropagation();
        this.texto = evento.target.value;
    }

    _handlerMudancaCategoria(evento){
        evento.stopPropagation();
        this.categoria = evento.target.value;
    }

    _criarNota(evento){
        evento.preventDefault();
        evento.stopPropagation();
        this.props.criarNota(this.titulo, this.texto, this.categoria);
    }

    render (){
        return (
            <form className="form-cadastro" onSubmit={this._criarNota.bind(this)}>
                <select onChange={this._handlerMudancaCategoria.bind(this)} className="form-cadastro_input">
                <option>Sem Categoria</option>
                {this.state.categorias.map((categoria, index) => {
                    return (
                        <option className='lista-categorias_item' key={index}>{categoria}</option>
                    );
                })}
                </select>
                <input
                    type="text"
                    placeholder="Titulo"
                    className="form-cadastro_input"
                    onChange={this._handlerMudancaTitulo.bind(this)}
                />
                <textarea
                    onChange={this._handlerMudacaTexto.bind(this)}
                    rows={15}
                    placeholder="Escreva sua nota..."
                    className="form-cadastro_input"
                />
                <button className="form-cadastro_input form-cadastro_submit">
                    Criar Nota
                </button>
            </form>
        )
    }
}

export default FormularioCadastro;