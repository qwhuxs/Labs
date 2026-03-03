import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import Button from "../components/Button";
import { useGameSettings } from "../context/GameSettingsContext";

const schema = yup.object().shape({
  rounds: yup.number().min(3).max(20).required(),
  difficulty: yup.string().oneOf(["easy", "medium", "hard"]).required(),
  timer: yup.number().oneOf([0, 10, 20, 30]).required(),
});

const PageContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  background: ${props => props.theme.colors.background};
  padding: 40px;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.large};
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.6s ease;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  margin: 30px auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 1.1rem;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.colors.secondary};
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.2);
    transform: scale(1.02);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  font-size: 1.1rem;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.colors.secondary};
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.2);
    transform: scale(1.02);
  }
`;

export default function SettingsPage() {
  const navigate = useNavigate();
  const { settings, setSettings } = useGameSettings();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: settings,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setSettings(data);
    navigate("/game");
  };

  return (
    <PageContainer>
      <h2>⚙ Налаштування гри</h2>

      <SettingsForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="rounds">Кількість раундів</Label>
          <Input 
            type="number" 
            id="rounds"
            min="3"
            max="20"
            {...register("rounds")} 
          />
          {errors.rounds && <span style={{color: 'red'}}>{errors.rounds.message}</span>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="difficulty">Рівень складності</Label>
          <Select id="difficulty" {...register("difficulty")}>
            <option value="easy">🟢 Легкий</option>
            <option value="medium">🟡 Середній</option>
            <option value="hard">🔴 Складний</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="timer">Таймер</Label>
          <Select id="timer" {...register("timer")}>
            <option value={0}>⏰ Без таймера</option>
            <option value={10}>⏱️ 10 секунд</option>
            <option value={20}>⏱️ 20 секунд</option>
            <option value={30}>⏱️ 30 секунд</option>
          </Select>
        </FormGroup>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
          <Button type="submit" text="Старт ▶️" />
          <Button 
            type="button" 
            text="Назад ↩️" 
            onClick={() => navigate("/")}
            style={{ backgroundColor: '#e2e8f0', color: '#4a5568' }}
          />
        </div>
      </SettingsForm>
    </PageContainer>
  );
}