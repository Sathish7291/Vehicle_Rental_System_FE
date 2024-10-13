import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PlaceHolderImage from '../assets/placeholder-image.jpg'
import { ListGroup } from 'react-bootstrap';


function BlogCard({data={},handleLike=null}) {
  let id = sessionStorage.getItem("id")
  return <div className='blogs-children'> 
    <Card style={{ width: '30rem' }}>
      <Card.Img variant="top" src={data.image ?? PlaceHolderImage} />
      <Card.Body>
        <Card.Title>{data.name ?? "Vehicle Name"}</Card.Title>
        <Card.Text>
        {data.description ?? `Some quick example text to build on the card title and make up the
          bulk of the card's content.`}
        </Card.Text>
        <ListGroup className="list-group-flush">
        <ListGroup.Item>Model: {data.model} </ListGroup.Item>
        <ListGroup.Item>Year: {data.year}</ListGroup.Item>
        <ListGroup.Item>Price_Per_Hour: {data.price_per_hour}</ListGroup.Item>
        <ListGroup.Item>Location: {data.location}</ListGroup.Item>
      </ListGroup>
        {
          data.id ? <div>
          <Button variant="primary" onClick={()=>handleLike(data.id)}>
            {data.likes.includes(id)?"Unlike":"Like"}
          </Button>
          &nbsp;&nbsp;
          <Button variant="primary" disabled>
            Share
          </Button>
          &nbsp;&nbsp;
          <Button variant="primary" disabled>
            Comment
          </Button>
          <br/><br/>
          <div className='flex'>
            <span className='text-muted font-size-smaller mr-10'>{data.likes.length} Likes</span>
            <span className='text-muted font-size-smaller mr-10'>0 Shares</span>
            <span className='text-muted font-size-smaller mr-10'>0 Comments</span>
          </div>
          </div>:<></>
        }
      </Card.Body>
    </Card>

  </div>
}

export default BlogCard