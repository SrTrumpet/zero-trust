import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { CrearUserInput } from './dto/crear-user.input';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService){}

    @Query(() => String)
    hello(){
        return 'graphql authUser';
    }


    @Mutation(()=> String)
    async login(@Args('loginInput') loginInput: LoginInput) {
        const user = await this.authService.validarUser(
            loginInput.email,
            loginInput.password,
        );
        if(!user){
            throw new Error('Credenciales incorrectas');
        }
        const token = await this.authService.login(user);
        return token.access_token;
    }

    @Mutation(() => String)
    async register(@Args('crearUserInput') input: CrearUserInput){
        const token = await this.authService.register(input);
        return token.access_token;
    }
}