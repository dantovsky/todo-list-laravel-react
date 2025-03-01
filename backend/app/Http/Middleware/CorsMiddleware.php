<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $allowedOrigins = Config::get('app.cors_allowed_origins', ['http://localhost:5173']); // Default to localhost if not set
        $allowedMethods = 'GET, POST, PUT, DELETE, OPTIONS'; // Can also be made configurable
        $allowedHeaders = 'Content-Type, Authorization'; // Can also be made configurable
        $supportsCredentials = true; // You can set this to false, if you don't need it.
        $response = $next($request);

        // Handle OPTIONS requests
        if ($request->isMethod('OPTIONS')) {
            $response = response('', 204); // Return 204 No Content for OPTIONS
        }

        $origin = $request->headers->get('Origin');
        if (in_array($origin, $allowedOrigins)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
        }
        
        $response->headers->set('Access-Control-Allow-Methods', $allowedMethods);
        $response->headers->set('Access-Control-Allow-Headers', $allowedHeaders);

        if ($supportsCredentials) {
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        }

        return $response;
    }
}
