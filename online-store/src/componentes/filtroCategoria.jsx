import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class FiltroCategoria extends Component {
  constructor(props) {
    super(props);

    this.quandoMudar = this.quandoMudar.bind(this);

    this.state = {
      categorias: [],
    };
  }

  componentDidMount() {
    getCategories().then((data) => this.setState({ categorias: data }));
  }

  quandoMudar({ target }) {
    const { mudandoCategoria } = this.props;
    mudandoCategoria(target.id);
  }

  render() {
    const { categorias } = this.state;
    return (
      <div>
        { categorias.map((categoria) => (
          <div key={ categoria.id }>
            <label
              data-testid="category"
              htmlFor={ categoria.id }
            >
              <input
                type="radio"
                name="categoria"
                id={ categoria.id }
                onChange={ this.quandoMudar }
              />
              { categoria.name }
            </label>
          </div>
        ))}
      </div>
    );
  }
}

FiltroCategoria.propTypes = {
  mudandoCategoria: PropTypes.func.isRequired,
};