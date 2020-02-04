import React from 'react';
import Button from './button';
import FormInput from './form-input';

class InventoryRow extends React.Component {
  constructor(props) {
    super(props);
    this.initialItem = this.props.item;
    this.state = {
      item: {
        amount: this.initialItem.amount,
        amountString: this.initialItem.amountString,
        id: this.initialItem.id,
        itemName: this.initialItem.itemName,
        notes: this.initialItem.notes,
        unitId: this.initialItem.unitId
      },
      view: 'info',
      name: { input: this.initialItem.itemName, isValid: false, isFocused: false },
      amount: { input: this.initialItem.amount, isValid: false, isFocused: false },
      unit: { input: this.initialItem.unitId, isValid: false, isFocused: false },
      notes: { input: this.initialItem.notes, isValid: false, isFocused: false }
    };
    this.textPattern = /^[A-Za-z \d]{3,150}$/;
    this.changeView = this.changeView.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.input.match(this.textPattern) &&
      !isNaN(this.state.amount.input) &&
      this.state.notes.input.match(this.textPattern)) {
      this.props.onSubmit({
        id: this.state.item.id,
        itemName: this.state.name.input,
        amount: this.state.amount.input,
        notes: this.state.notes.input,
        unitId: this.state.unit.input
      });
    }
    this.changeView();
  }

  handleChange(event) {
    var input = event.target.value;
    var isValid = event.target.name === 'amount' ? !isNaN(input) && parseFloat(input) : this.textPattern.test(input);
    this.setState({ [event.target.name]: { input: input, isValid: isValid, isFocused: true } });
  }

  handleBlur(event) {
    let field = event.target.name;
    this.setState({ [field]: { input: this.state[field].input, isValid: this.state[field].isValid, isFocused: false } });
  }

  changeView() {
    let newState = this.state.view === 'info' ? 'edit' : 'info';
    this.setState({ view: newState,
      name: { input: this.state.item.itemName },
      amount: { input: this.state.item.amount },
      units: { input: this.state.item.unitId },
      notes: { input: this.state.item.notes } });
  }

  formatUnits(unitString) {
    let unitComponents = unitString.split(' ');
    if (unitComponents[0] > 1) {
      unitComponents[1] = unitComponents[1] === 'inch' ? unitComponents[1] + 'es' : unitComponents[1] + 's';
    }
    return unitComponents.join(' ');
  }

  render() {
    let tableData = null;
    if (this.state.view === 'info') {
      tableData =
      (<>
      <td scope='row'>{this.state.item.itemName}</td>
        <td>{this.formatUnits(this.state.item.amountString)}</td>
        <td>{this.state.item.notes}</td>
        <td className="align-middle">
          <Button color='delete-button mb-auto align-self-left'
            symbol='fa-times'
            handleClick={() => this.props.handleDelete(this.state.item.id)} text='' />
          <Button
            color='add-button mb-auto ml-1'
            symbol='fa-pencil-alt'
            handleClick={this.changeView} text='' />
        </td>
        </>);
    } else if (this.state.view === 'edit') {
      tableData = (
      <>
          <td scope='row'><form onSubmit={this.handleSubmit}>
            <FormInput
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              fieldName="name"
              fieldValue={this.state.name}
            /></form></td>
          <td><form onSubmit={this.handleSubmit}>
            <FormInput
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              fieldName="amount"
              fieldValue={this.state.amount}
              optionalField={(
                <select name='unit' type='select' onChange={this.handleChange} value={this.state.unit.input}>
                  {this.props.unitList.map(unit => <option key={unit.unitId} value={unit.unitId}>{unit.unitName}</option>)}
                </select>)}
            /></form></td>
          <td><form onSubmit={this.handleSubmit}>
            <FormInput
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              fieldName="notes"
              fieldValue={this.state.notes}
            /></form></td>
        <td className="align-middle">
          <Button color='delete-button mb-auto align-self-left'
            symbol='fa-times'
            handleClick={this.changeView} text='' />
          <Button
            color='add-button mb-auto ml-1'
            symbol='fa-check'
            handleClick={this.handleSubmit} text='' />
        </td>
        </>
      );
    }
    return (
      <tr item={this.state.item.id}>
        {tableData}
      </tr>
    );
  }
}

export default InventoryRow;
