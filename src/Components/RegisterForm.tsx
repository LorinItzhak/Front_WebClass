import { FC, useEffect } from 'react'
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    Username: z.string().min(3, "Username must be at least 3 characters"),
    Password: z.string().min(6, "Password must be at least 6 characters"),
    email: z.string().email("Invalid email address"),
    picture: z.string().url("Invalid URL").optional(),
})

type FormData = z.infer<typeof schema>

const StudentForm: FC = () => {
    const { register, handleSubmit, formState, setValue } = useForm<FormData>({ resolver: zodResolver(schema) })
    console.log('StudentForm rendered')

    useEffect(() => {
        if (formState.errors.picture) {
            setValue('picture', 'http://localhost:3003/public/avatar.png')
        }
    }, [formState.errors.picture, setValue])

    const onSubmit = async (data: FormData) => {
        console.log('Form submitted')
        console.log(data)

        try {
            const response = await fetch('http://localhost:3003/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const result = await response.json()
            console.log('Registration successful:', result)
        } catch (error) {
            console.error('Error during registration:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='m-3'>
            <h1>Register</h1>
            <div className='m-3' >
                <label htmlFor='Username' className='form-label mt-3'>Username:</label>
                <input id='Username' type="text" className='form-control' {...register('Username')}/>
                {formState.errors.Username && <div className='text-danger'>{formState.errors.Username.message}</div>}

                <label htmlFor='email' className='form-label mt-3'>Email:</label>
                <input id='email' type="email" className='form-control' {...register('email')}/>
                {formState.errors.email && <div className='text-danger'>{formState.errors.email.message}</div>}
                
                <label htmlFor='Password' className='form-label mt-3'>Password:</label>
                <input id='Password' type="password" className='form-control' {...register('Password')}/>
                {formState.errors.Password && <div className='text-danger'>{formState.errors.Password.message}</div>}

                <label htmlFor='picture' className='form-label mt-3'>Picture:</label>
                <input id='picture' type="text" className='form-control' {...register('picture')}/>
                {formState.errors.picture && <div className='text-danger'>Invalid URL. Default picture set.</div>}
                

                <button type='submit' className='btn btn-primary mt-3'>Submit</button>
            </div>
            </div>
        </form>
    )
}

export default StudentForm