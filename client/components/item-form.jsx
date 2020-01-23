import React from 'react';
import FormInput from './form-input';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { input: '', isValid: false, isFocused: false },
      amount: { input: '', isValid: false, isFocused: false },
      notes: { input: '', isValid: false, isFocused: false }
    };
    this.textPattern = /^[A-Za-z \d]{3,64}$/;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClear() {
    this.setState({
      name: { input: '' },
      amount: { input: '' },
      notes: { input: '' }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.input.match(this.textPattern) &&
      this.state.amount.input.match(this.textPattern) &&
      this.state.notes.input.match(this.textPattern)) {
      this.props.onSubmit({
        itemName: this.state.name.input,
        amount: this.state.amount.input,
        notes: this.state.notes.input,
        id: 1
      });
      this.handleClear();
    }
  }

  handleChange(event) {
    var input = event.target.value;
    var isValid = this.textPattern.test(input);
    this.setState({ [event.target.name]: { input: input, isValid: isValid, isFocused: true } });
  }

  handleBlur(event) {
    let field = event.target.name;
    this.setState({ [field]: { input: this.state[field].input, isValid: this.state[field].isValid, isFocused: false } });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <FormInput
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            symbol="fa-cut"
            fieldName="name"
            fieldValue={this.state.name}
          />
          <FormInput
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            symbol="fa-coins"
            fieldName="amount"
            fieldValue={this.state.amount}
          />
          <FormInput
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            symbol="fa-sticky-note"
            fieldName="notes"
            fieldValue={this.state.notes}
          />
          <button type="submit" onClick={this.handleSubmit} className="btn btn-success mr-1">Add</button>
          <button type="button" onClick={this.handleClear} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default ItemForm;
