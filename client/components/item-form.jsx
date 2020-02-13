import React from 'react';
import FormInput from './form-input';
import InvalidInput from './invalid-input';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { input: '', isValid: false, isFocused: false },
      amount: { input: '', isValid: false, isFocused: false },
      unit: { input: '1', isValid: false, isFocused: false },
      notes: { input: '', isValid: false, isFocused: false },
      nameError: { errorMessage: '- This field cannot be left blank', displayError: false },
      amountError: { errorMessage: '- This field cannot be left blank', displayError: false },
      notesError: { errorMessage: '- This field cannot be left blank', displayError: false }
    };
    this.textPattern = /^[A-Za-z \d,.':;"?]{3,150}$/;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClear() {
    this.setState({
      name: { input: '' },
      amount: { input: '' },
      notes: { input: '' },
      nameError: { errorMessage: '', displayError: false },
      amountError: { errorMessage: '', displayError: false },
      notesError: { errorMessage: '', displayError: false }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.input.match(this.textPattern) &&
      !isNaN(this.state.amount.input) &&
      this.state.amount.input < 30000 &&
      this.state.notes.input.match(this.textPattern)) {
      this.props.onSubmit({
        itemName: this.state.name.input.trim(),
        amount: this.state.amount.input.trim(),
        notes: this.state.notes.input.trim(),
        unitId: this.state.unit.input
      });
      this.handleClear();
    }
    // else {
    //   this.setState({
    //     nameError: { errorMessage: this.state.nameError.errorMessage, displayError: !this.state.name.isValid },
    //     amountError: { errorMessage: this.state.amountError.errorMessage, displayError: !this.state.amount.isValid },
    //     notesError: { errorMessage: this.state.notesError.errorMessage, displayError: !this.state.notes.isValid } });
    // }
  }

  handleChange(event) {
    const input = event.target.value;
    const field = event.target.name;
    const isValid = event.target.name === 'amount' ? !isNaN(input) && parseFloat(input) && parseFloat(input) < 30000 : this.textPattern.test(input);
    if (field === 'name' || field === 'notes') {
      if (input.length > 150) {
        return;
      }
    } else if (field === 'amount') {
      if (isNaN(input)) return;
    }
    this.setState({
      [event.target.name]: { input: input, isValid: isValid, isFocused: true },
      isSubmitted: false,
      nameError: { errorMessage: this.state.nameError.errorMessage, displayError: false },
      amountError: { errorMessage: this.state.amountError.errorMessage, displayError: false },
      notesError: { errorMessage: this.state.notesError.errorMessage, displayError: false }
    });
  }

  handleBlur(event) {
    let field = event.target.name;
    this.setState({ [field]: {
      input: this.state[field].input,
      isValid: this.state[field].isValid,
      isFocused: false
    } }, () => { if (!this.state[field].isValid) { this.displayError(field); } });
  }

  displayError(field) {
    let error = '';
    const errorType = field + 'Error';
    if (field === 'name' || field === 'notes') {
      if (this.state[field].input.length < 3) {
        error += '- Item name must be at least 3 characters\n';
      } else if (!this.state[field].input.match(this.textPattern)) {
        error += '-Item name cannot include special characters\n';
      }
    } else if (field === 'amount') {
      error += '- Amount must not exceed 30000\n';
    }
    this.setState({ [errorType]: { errorMessage: error, displayError: true } });
  }

  render() {
    const inputMessage = this.state.isSubmitted &&
    !(this.state.amount.isValid &&
    this.state.name.isValid &&
    this.state.notes.isValid) ? <InvalidInput text={this.state.errorMessage}/> : null;
    const submitButtonClass = this.state.amount.isValid &&
    this.state.name.isValid &&
      this.state.notes.isValid ? 'btn-success' : 'btn-secondary';
    const nameError = this.state.nameError.displayError && this.state.nameError.errorMessage ? <InvalidInput text={this.state.nameError.errorMessage}/> : null;
    const amountError = this.state.amountError.displayError && this.state.amountError.errorMessage ? <InvalidInput text={this.state.amountError.errorMessage}/> : null;
    const notesError = this.state.notesError.displayError && this.state.notesError.errorMessage ? <InvalidInput text={this.state.notesError.errorMessage}/> : null;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div>Item Name</div>
          <FormInput
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            symbol="fa-cut"
            fieldName="name"
            fieldValue={this.state.name}
          />{nameError}
          <div>Item Amount</div>
          <FormInput
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            symbol="fa-coins"
            fieldName="amount"
            fieldValue={this.state.amount}
            optionalField={(
              <select name='unit' type='select' onChange = {this.handleChange} >
                {this.props.unitList.map(unit => <option key={unit.unitId} value={unit.unitId}>{unit.unitName}</option>)}
              </select>)}
          />{amountError}
          <div>Additional Notes</div>
          <FormInput
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            symbol="fa-sticky-note"
            fieldName="notes"
            fieldValue={this.state.notes}
          />{notesError}
          <button type="submit" onClick={this.handleSubmit} className={'btn mr-1 ' + submitButtonClass}>Add</button>
          <button type="button" onClick={this.handleClear} className="btn btn-secondary">Cancel</button>
          {inputMessage}
        </div>
      </form>
    );
  }
}

export default ItemForm;
