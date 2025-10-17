package com.example.taskmanager.repository;

import com.example.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.createdAt >= :sevenDaysAgo")
    List<Task> findTasksLast7Days(LocalDateTime sevenDaysAgo);

    @Query("SELECT t FROM Task t WHERE t.createdAt >= :sevenDaysAgo AND t.status = :status")
    List<Task> findTasksLast7DaysByStatus(LocalDateTime sevenDaysAgo, String status);

    // New method for searching tasks
    List<Task> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
}