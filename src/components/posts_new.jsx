import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	renderField(field){
		const { meta: { touched, error } } = field; //google: deconstruction ES6
		const className = `form-group ${touched && error ? 'has-danger':''}`
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input 
					className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		)
	}
	
	onSubmit(values){
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					name="title"
					label="Title"
					component={this.renderField}
				/>
				<Field
					name="categories"
					label="Categories"
					component={this.renderField}
				/>
				<Field
					name="content"
					label="Post Content"
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {}

	// validate the inputs from 'values'
	if (!values.title) {
		errors.title = "Enter a title!"
	}
	if (!values.categories) {
		errors.categories = "Enter some categories!"
	}
	if (!values.content) {
		errors.content = "Enter some content!"
	}

	// If errors is empty, the form is OK to submit
	// If errors contains something, redux-form assumes form is invalid
	return errors;
}

export default reduxForm({
	validate, //harusnya validate: validate, tapi krn sama, bisa pake ES6
	form: 'PostNewForm'
})(
	connect(null,{ createPost })(PostsNew)
);

