import Part from '../components/Part'

const Content = (props) => (
  <>
    {props.course.parts.map((part) => (
      <Part key={part.id} name={part.name} exercise={part.exercises} />
    ))}
  </>
);

export default Content