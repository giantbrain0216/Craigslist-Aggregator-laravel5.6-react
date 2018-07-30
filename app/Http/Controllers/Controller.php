<?php

namespace App\Http\Controllers;

use App\CLAgg\ReadConfig;
use App\CLAgg\Scraper;
use App\CLAgg\Utils;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function indexWildCard()
    {
        return view('index');
    }

    public function initConf(Request $request)
    {
        $sites = config('app.sites');
        $site = $request->get('site','jobs');
        $site = 'find'.$site;

        if(!isset($sites[$site]))
            return response()->redirectTo('/');

        $conf_file = base_path("/sites/{$site}.locations.xml");
        $config = new ReadConfig($conf_file);
        $conf_data = get_object_vars($config->getInfo());
        $conf = [
            'title'           =>$conf_data['title'],
            'server_name'     =>$_SERVER['SERVER_NAME'],
            'sites'           =>$sites,
            'site'            =>$site,
            'page_type'       =>$conf_data['pageType'],
            'page_title'      =>$conf_data['pagetitle'],
            'search_example'  =>$conf_data['pagesearchexample'],
            'fields'          =>$config->getFieldsArray(),
        ];
        return response()->json($conf);
    }

    public function postSiteFetch(Request $request)
    {
        $sites = config('app.sites');
        $site = $request->get('site','jobs');

        if(!str_contains($site, 'find'))
            $site = 'find'.$site;

        if(!isset($sites[$site]))
        {
            return response()->json (array(
                'status'=>false,
                'message'=>'site not defined'
            ), 500);
        }

        $include = $request->get('include', false);

        $conf_file = base_path("/sites/{$site}.locations.xml");
        $config         = new ReadConfig($conf_file);
        $fields         = $config->getFields();
        $locations      = $config->getLocations();
        $search_field   = $request->get($fields[0]['argName'], false);

        if($search_field !== false)
        {
            Utils::$cache_url = base_path('/storage/framework/cache/');
            // $_POST IS NO LONGER USED, POST-BODY IS AS JSON
            $request_data = json_decode($request->getContent(), true);
            $scraper = new Scraper($request_data, $include, $locations, $fields);
            $results = array_values($scraper->getRecords());
            return response()->json(['search_results'=>$results]);
        }

        return response()->json([
            'status'=>false,
            'message'=>'argument parameter not defined'
        ], 500);
    }

    public function getSiteConf(Request $request)
    {
        $site = $request->get('site','jobs');
        $site = 'find'.$site;
        $sites = config('app.sites');

        if(!isset($sites[$site]))
        {
            return response()->json (array(
                'status'=>false,
                'message'=>'site not defined'
            ), 500);
        }

        $conf_file = base_path("/sites/{$site}.locations.xml");
        $config = new ReadConfig($conf_file);

        return response()->json([
            'page_info'      =>$config->getInfo(),
            'region_list'   =>$config->getRegions(),
            'area_list'      =>$config->getAreas(),
            'fields'      =>$config->getFieldsArray()
        ]);
    }
}
