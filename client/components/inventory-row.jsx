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
    this.changeView = this.changeView.bind(this);
  }

  changeView() {
    let newState = this.state.view === 'info' ? 'edit' : 'info';
    this.setState({ view: newState });
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
        <td scope='row'><FormInput
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
          fieldName="name"
          fieldValue={this.state.name}
        /></td>
          <td><FormInput
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            fieldName="amount"
            fieldValue={this.state.amount}
            optionalField={(
              <select name='unit' type='select' onChange={this.handleChange} >
                {this.props.unitList.map(unit => <option key={unit.unitId} value={unit.unitId}>{unit.unitName}</option>)}
              </select>)}
          /></td>
          <td><FormInput
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            fieldName="notes"
            fieldValue={this.state.notes}
          /></td>
        <td className="align-middle">
          <Button color='delete-button mb-auto align-self-left'
            symbol='fa-times'
            handleClick={() => this.props.handleDelete(this.state.item.id)} text='' />
          <Button
            color='add-button mb-auto ml-1'
            symbol='fa-check'
            handleClick={this.changeView} text='' />
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
