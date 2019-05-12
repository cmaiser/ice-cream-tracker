import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';


class FlavorRate extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    emptyRating = {
        iceCreamRating: null
    };

    emptyFlavor = {
        flavor: '',
        ratings: []
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            rating: this.emptyRating,
            flavor: this.emptyFlavor,
            csrfToken: cookies.get('XSRF-TOKEN')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

        document.title = 'Rate Ice Cream';
        var id = this.props.match.params.id;
        const flavor = await (await fetch("/api/flavor/" + id, {credentials: 'include'})).json();
        this.setState({
            flavor: flavor
        });
        this.setState({
            rating: this.state.flavor.ratings.length > 0 ? this.state.flavor.ratings[0] : this.emptyRating
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = parseInt(target.value);
        let rating = {...this.state.rating};
        rating.iceCreamRating = value;
        rating.flavor = this.state.flavor;
        this.setState({rating});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {rating} = this.state;

        await fetch('/api/rating', {
            method: (this.state.flavor.ratings.length > 0) ? 'PUT' : 'POST',
            headers: {
                'X-XSRF-TOKEN': this.state.csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rating),
            credentials: 'include'
        });
        this.props.history.push('/flavors');
    }

    render() {
        const {rating} = this.state
        const {flavor} = this.state
        const title = <h2>{rating ? 'Edit Rating for ' + flavor.flavor: 'Add Rating'}</h2>

        return <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Select a value from 1 to 5</Label>
                        <Input type="number" min="1" max="5" name="rating" id="rating" value={rating.iceCreamRating}
                               onChange={this.handleChange} autoComplete="rating"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/flavors">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>

    }
}

export default withCookies(withRouter(FlavorRate));