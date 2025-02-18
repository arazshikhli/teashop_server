import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-yandex";

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private configService: ConfigService) {
        super({
            clientID: configService.get<string>('YANDEX_CLIENT_ID',''),
            clientSecret: configService.get<string>('YANDEX_CLIENT_SECRET',''),
            callbackURL: `${configService.get<string>('SERVER_URL')}/auth/yandex/callback`,
        } );
    }

    async validate(_accessToken: string, _refreshToken: string, profile: Profile, done: any) {
        const { username, emails, photos } = profile;
        
        const user = {
            email: emails?.[0]?.value || null, // Проверка на undefined
            name: username,
            photo: photos?.[0]?.value || null, // Проверка на undefined
        };

        done(null, user);
    }
}
