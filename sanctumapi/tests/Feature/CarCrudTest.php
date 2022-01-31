<?php

namespace Tests\Feature;

use App\Models\Car;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class CarCrudTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    protected function authenticate(){
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => Hash::make('secret1234'),
        ]);
        $this->user = $user;
    }

    public function testCars()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => Hash::make('secret1234'),
        ]);
        $response = $this->json('POST',route('api.login'),[
            'email' => 'test@gmail.com',
            'password' => 'secret1234',
        ]);
        $response = $this->withHeaders([
            'Authorization' => 'Bearer '
        ])->json('GET','api/cars');
        $response->assertStatus(200);
        User::where('email','test@gmail.com')->delete();
    }


    public function testCreate()
    {
        $user = User::create([
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => Hash::make('secret1234'),
        ]);
        $response = $this->json('POST',route('api.login'),[
            'email' => 'test@gmail.com',
            'password' => 'secret1234',
        ]);
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ',
        ])->json('POST',route('cars.store'),[
            'model' => 'abcd',
            'brand' => 'hh',
            'stock' => 10,
            'booked' => 5,
            'available' => 5,
        ]);
        $response->assertStatus(200);
        User::where('email','test@gmail.com')->delete();
        Car::where('model','abcd')->where('brand','hh')->delete();
    }



}
