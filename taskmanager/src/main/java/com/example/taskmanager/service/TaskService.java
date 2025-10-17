package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.exception.TaskNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task getTaskById(Long id) {
        return repo.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    }

    public Task createTask(Task task) {
        return repo.save(task);
    }

    public Task updateTask(Long id, Task updatedTask) {
        updatedTask.setId(id);
        return repo.save(updatedTask);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }

    public List<Task> getLast7DaysTasks() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        return repo.findTasksLast7Days(sevenDaysAgo);
    }

    public List<Task> getLast7DaysTasksByStatus(String status) {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        return repo.findTasksLast7DaysByStatus(sevenDaysAgo, status);
    }

    // New method for searching tasks
    public List<Task> searchTasks(String query) {
        return repo.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
    }
}