import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class TipCalculator extends LitElement 
{
    // Estructura de estilos CSS
    static styles = css`
        :host {
            display: block;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 30px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            max-width: 400px;
            margin: 20px auto;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        
        h3 {
            text-align: center;
            color: #333;
            margin-bottom: 25px;
            font-size: 1.5em;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #555;
        }
        
        input[type="number"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 16px;
            box-sizing: border-box;
            margin-bottom: 20px;
            transition: border-color 0.3s ease;
        }
        
        input[type="number"]:focus {
            outline: none;
            border-color: #4CAF50;
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
        }
        
        input[type="range"] {
            width: 100%;
            margin-bottom: 20px;
            -webkit-appearance: none;
            appearance: none;
            height: 8px;
            background: #ddd;
            border-radius: 5px;
            outline: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #4CAF50;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #4CAF50;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .result {
            font-weight: bold;
            color: #4CAF50;
            margin-top: 20px;
            text-align: center;
            font-size: 1.2em;
            background: rgba(76, 175, 80, 0.1);
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #4CAF50;
        }
    `;

    // Propiedades reactivas de LitElement
    static properties = {
        total: { type: Number },
        percentage: { type: Number },
        people: { type: Number }
    };

    // Constructor para inicializar valores
    constructor() {
        super();
        this.total = 0;
        this.percentage = 10;
        this.people = 1;
    };

    // Manejador de eventos para actualizar el total
    _updateTotal(e) {
        this.total = Number(e.target.value);
    }

    // Manejador de eventos para actualizar el porcentaje
    _updatePercentage(e) {
        this.percentage = Number(e.target.value);
    }

    _updatePeople(e) {
        this.people = Number(e.target.value) || 1;
    }

    // Encargado de renderizar el template HTML
    render() {
        const tipTotal = this.total * (this.percentage / 100);
        const finalBill = this.total + tipTotal;
        const perPerson = finalBill / this.people;

        return html`
        <h3>Calculadora de Propinas</h3>

        <label>Total de la cuenta: </label>
        <input type="number" @input="${this._updateTotal}">

        <label>¿Cuántas personas? </label>
        <input type="number" min="1" .value="${this.people}" @input="${this._updatePeople}">

        <label>Porcentaje de la propina: ${this.percentage}%</label>
        <input type="range" min="0" max="30" .value="${this.percentage}" @input="${this._updatePercentage}">

        <div class="result">
            <div>
                Propina Total: $${tipTotal.toFixed(2)}
            </div>

            <div style="font-size: 1.4em; margin-top: 10px;">
                Total: $${finalBill.toFixed(2)}
            </div>

            ${this.people > 1 ? html`
                <div style="color: #2e7d32; border-top: 1px solid #ccc; margin-top: 10px; padding-top: 10px;">
                    Cada uno paga: $${perPerson.toFixed(2)}
                </div>
            ` : ''}
        </div>
        `
    };
}

customElements.define('tip-calculator', TipCalculator);