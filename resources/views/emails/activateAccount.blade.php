{{-- 這是傳到 user 信箱的模板 --}}
{{ Lang::get('auth.clickHereActivate') }}
<a href="{{ url('activate/'.$code) }}" >
	{{ url('activate/') }}
</a>