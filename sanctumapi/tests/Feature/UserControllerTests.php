<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\Response;
class UserControllerTests extends TestCase
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

    public function testIndexReturnsDataInValidFormat() {

        $this->json('get', 'api/user')
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure(
                [
                    'data' => [
                        '*' => [
                            'id',
                            'name',
                            'email',
                            'created_at',
                        ]
                    ]
                ]
            );
    }

    public function testUserIsCreatedSuccessfully() {

        $payload = [
            'name' => $this->faker->name,
            'email'      => $this->faker->email
        ];
        $this->json('post', 'api/user', $payload)
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure(
                [
                    'data' => [
                        'id',
                        'name',
                        'email',
                        'created_at',
                    ]
                ]
            );
        $this->assertDatabaseHas('users', $payload);
    }

}
