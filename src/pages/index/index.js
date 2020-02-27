import React, {useState,useEffect} from 'react'
import {Card,Navbar, Nav} from 'react-bootstrap';

const URL_API = 'https://servicodados.ibge.gov.br/api/v3';
const URL_WEB_SITE = 'https://agenciadenoticias.ibge.gov.br/'
 
const Index = _ => {
    const [news, setNews] = useState({isLoading: true, data : []});

    useEffect(_ => {
        fetch(`${URL_API}/noticias/?qtd=10`)
            .then(response => response.json().then(data => setNews({isLoading: false, data})))
    }, [])

    return(
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">
                    Matheus PWA
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Ínicio</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {news.isLoading ? (<p>Carregando</p>) : 
            (

                <div>
                    {news.data.items.map((value, index) => 
                        <Card>
                            <Card.Img variant="top" src={`${URL_WEB_SITE+JSON.parse(value.imagens).image_intro}`} />
                            <Card.Body>
                                <Card.Title>{value.titulo}</Card.Title>
                                <Card.Text>
                                    {value.introducao}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                    
                </div>        
            )}
        </div>
        
    )
}

export default Index;