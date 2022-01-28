<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use App\Models\Car;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Car as CarResource;
class CarController extends BaseController
{

    public function index()
    {
        $cars = Car::all();
        return $this->handleResponse(CarResource::collection($cars), 'Cars have been retrieved!');
    }


    public function store(Request $request)
    {
        $request->booked=0;
        $request->available=0;
        $input = $request->all();
//        $imput['booked']=0;
//        $imput['available']=0;
        $validator = Validator::make($input, [
            "model" => "required|unique:cars",
            "brand" => "required",
            "stock" => "required|numeric|min:0"
        ]);
        if($validator->fails()){
            return $this->handleError($validator->errors());
        }
        $task = Car::create($input);
        return $this->handleResponse(new CarResource($task), 'Car created!');
    }


    public function show($id)
    {
        $car = Car::find($id);
        if (is_null($car)) {
            return $this->handleError('Car not found!');
        }
        return $this->handleResponse(new CarResource($car), 'Car retrieved.');
    }

    public function edit($id)
    {
        $car = Car::find($id);
        if($car)
        {
            return response()->json([
                'status'=> 200,
                'car' => $car,
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Car ID Found',
            ]);
        }

    }


    public function update(Request $request, Car $car)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            "model" => "required",
            "brand" => "required",
            "stock" => "required|numeric|min:0"
        ]);

        if($validator->fails()){
            return $this->handleError($validator->errors());
        }

        $car->model = $input['model'];
        $car->brand = $input['brand'];
        $car->stock = $input['stock'];
        $car->booked = $input['booked'];
        if($car-> booked == NULL )
            $car->booked =0;
        $car->available = $input['stock'] - $input['booked'];
        $car->save();

        return $this->handleResponse(new CarResource($car), 'Car successfully updated!');
    }

    public function destroy(Car $car)
    {
        $car->delete();
        return $this->handleResponse([], 'Car deleted!');
    }


}
