import './App.css';
import Form from './components/Form';
import ViewInfo from './components/ViewInfo';

function App() {
  return (
    <div className="App">
      <div className='row'>
        <div className='col-lg-4'> <Form /> </div>
        <div className='col-lg-8'> <ViewInfo /> </div>
      </div>
    </div>
  );
}

export default App;
