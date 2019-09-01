<?php

namespace App\Http\Controllers\API\GoogleApi;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PlacesAPI extends Controller
{
    private $tokenKey = "AIzaSyDcYfddvWPrVm2xhcJXJzIiNfIZ7bjo2IM";
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
    }

    /**
     * Search Places by Place name.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $validated = $request->validate([
            'input' => 'required',
        ]);
        $params = [
            'input' => $validated['input'],
            'inputtype' => "textquery",
            'fields' => "photos,formatted_address,name,rating,opening_hours,geometry",
            'key' => $this->tokenKey,
        ];
        $url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";
        $client = new Client();
        $res = $client->get($url. http_build_query($params));

        Log::info($url. http_build_query($params));

        if ($res->getStatusCode() == "200") {
            return response()->json([
                'error' => false,
                'responseCode' => $res->getStatusCode(),
                'data' => json_decode($res->getBody()),
            ]);
        }

        return response()->json([
            'error' => true,
            'responseCode' => $res->getStatusCode(),
        ]);

        //https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=โรงพยาบาลพยาไทย&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDcYfddvWPrVm2xhcJXJzIiNfIZ7bjo2IM
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
