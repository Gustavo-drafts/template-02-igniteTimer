import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from "phosphor-react";
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { CyclesContext } from '../../contexts/CyclesContext';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import {
  HomeContainer, StartCountdownButton, StopCountdownButton
} from "./styles";


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'zod diz: Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'Zod diz: Valor Max 60 minutos')
    .max(60, 'Zod diz: Valor Max 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSuubmitDisabled = !task


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ?
          (
            <StopCountdownButton onClick={interruptCurrentCycle} type='button'>
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton disabled={isSuubmitDisabled} type='submit'>
              <Play size={24} />
              Começar
            </StartCountdownButton>
          )}
      </form>
    </HomeContainer>
  )
};