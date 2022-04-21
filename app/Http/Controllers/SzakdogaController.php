<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Models\szakdoga;
use Illuminate\Support\Facades\DB;

class SzakdogaController extends Controller
{
    public function szakdoga_listaz(){
        $szakdogak = DB::table('szakdoga')
        ->select('id','szakdoga_nev','githublink','oldallink','tagokneve','timestamps')
        ->distinct()
        ->get();
        return  $szakdogak;
    }

    public function destroy($id){
        $szakdoga=DB::table('szakdoga')
        ->where('id','LIKE',$id)
        ->delete();
        return response()->json(true);
    }
}
