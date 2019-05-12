import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class FlavorList extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            flavors: [],
            csrfToken: cookies.get('XSRF-TOKEN'),
            isLoading: true};
    }

    async componentDidMount() {

        document.title = 'Ice Cream Flavors';

        this.setState({isLoading: true});

        fetch('api/allFlavors', {credentials: 'include'})
            .then(response => response.json())
            .then(data => this.setState({flavors: data, isLoading: false}))
            .catch(() => this.props.history.push('/'));
    }

    render() {
        const {flavors, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const flavorList = flavors.map(flavor => {
            return <tr key={flavor.id}>
            <td style={{whiteSpace: 'nowrap'}}>{flavor.flavor}</td>
             <td>
                 My Rating: {flavor.ratings.length > 0 ? flavor.ratings[0].iceCreamRating + "/5": "Not yet rated!"}
             </td>
             <td>
                 <ButtonGroup>
                     <Button size="sm" color="primary" tag={Link} to={"/rate/" + (flavor.id == null ? "new" : flavor.id)}>Rate</Button>
                 </ButtonGroup>
             </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/flavors/new">Add Flavor</Button>
                </div>
                    <h3>Ice Cream Flavors</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flavorList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    };


}

export default withCookies(withRouter(FlavorList));