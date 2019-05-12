import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';


class FlavorEdit extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    emptyFlavor = {
      flavor: ''
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            item: this.emptyFlavor,
            csrfToken: cookies.get('XSRF-TOKEN')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        document.title = 'Add Ice Cream';
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/flavor/', {
           method: 'POST',
           headers: {
               'X-XSRF-TOKEN': this.state.csrfToken,
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(item),
           credentials: 'include'
        });
        this.props.history.push('/flavors');
    }

    render() {
        const {item} = this.state;
        const title = <h2>Add Flavor</h2>

        return <div>
                <AppNavbar />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="flavor" id="flavor" value={item.flavor || ''}
                                onChange={this.handleChange} autoComplete="flavor"/>
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

export default withCookies(withRouter(FlavorEdit));