<?php

namespace Package\ResetsPassword\Notifications;
use Carbon\Carbon;
use Illuminate\Support\Str;
use app\User;
use Illuminate\Http\Request;
use Package\ResetsPassword\Models\ResetsPassword;
use Package\ResetsPassword\Notifications\ResetPasswordRequest;

class ResetPasswordController extends Controller
{
    /**
     * Create token password reset.
     *
     * @param  ResetPasswordRequest $request
     * @return JsonResponse
     */
    public function sendMail(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();
        $ResetsPassword = ResetsPassword::updateOrCreate([
            'email' => $user->email,
        ], [
            'token' => Str::random(60),
        ]);
        if ($ResetsPassword) {
            $user->notify(new ResetPasswordRequest($ResetsPassword->token));
        }
  
        return response()->json([
            'message' => 'We have e-mailed your password reset link!'
        ]);
    }

    public function reset(Request $request, $token)
    {
        $ResetsPassword = ResetsPassword::where('token', $token)->firstOrFail();
        if (Carbon::parse($ResetsPassword->updated_at)->addMinutes(720)->isPast()) {
            $ResetsPassword->delete();

            return response()->json([
                'message' => 'This password reset token is invalid.',
            ], 422);
        }
        $user = User::where('email', $ResetsPassword->email)->firstOrFail();
        $updatePasswordUser = $user->update($request->only('password'));
        $ResetsPassword->delete();

        return response()->json([
            'success' => $updatePasswordUser,
        ]);
    }
}